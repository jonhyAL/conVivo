<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('familyMembers');
        return view('profile', compact('user'));
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['nullable', 'string', 'max:50'],
            'birthdate' => ['nullable', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'location_enabled' => ['nullable', 'boolean'],
        ]);
        
        // Handle optional boolean checkbox not present in request. 
        // If the checkbox is unchecked, it won't be sent, so we default to false.
        $validated['location_enabled'] = $request->has('location_enabled');

        $user->update($validated);

        return back()->with('status', 'profile-updated');
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('status', 'password-updated');
    }

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => ['required', 'image', 'max:1024'],
        ]);

        $user = auth()->user();
        
        if ($request->file('photo')) {
            $path = $request->file('photo')->store('profile-photos', 'public');
            $user->update(['photo_path' => $path]);
        }

        return back()->with('status', 'photo-updated');
    }
    
    // Family Member Methods
    public function storeFamilyMember(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'relationship' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:20'],
            'is_primary_contact' => ['boolean'],
        ]);

        if ($request->is_primary_contact) {
            // Reset other primary contacts
            auth()->user()->familyMembers()->update(['is_primary_contact' => false]);
        }

        auth()->user()->familyMembers()->create($validated);

        return back()->with('status', 'family-added');
    }

    public function updateFamilyMember(Request $request, $id)
    {
        $member = auth()->user()->familyMembers()->findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'relationship' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:20'],
            'is_primary_contact' => ['boolean'],
        ]);

        if ($request->is_primary_contact) {
            auth()->user()->familyMembers()->where('id', '!=', $id)->update(['is_primary_contact' => false]);
        }

        $member->update($validated);

        return back()->with('status', 'family-updated');
    }

    public function deleteFamilyMember($id)
    {
        auth()->user()->familyMembers()->findOrFail($id)->delete();
        return back()->with('status', 'family-deleted');
    }
}
