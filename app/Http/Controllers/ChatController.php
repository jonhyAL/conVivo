<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getConversations()
    {
        $user = auth()->user();

        // If user is Admin, they chat with Users
        if ($user->is_admin) {
             // Get unique users who have messaged this admin or whom this admin has messaged
            $userIds = \App\Models\Message::where('sender_id', $user->id)
                ->orWhere('receiver_id', $user->id)
                ->get()
                ->map(function($msg) use ($user) {
                    return $msg->sender_id === $user->id ? $msg->receiver_id : $msg->sender_id;
                })
                ->unique();
            
            // Allow admin to also pick from all users if they want to start a chat? 
            // For now, let's just list active conversations + maybe all users if no conversation exists?
            // A simple approach: List all users, but prioritize those with messages.
            // Or better: Just list all users for the Admin to pick from.
            
            $users = \App\Models\User::where('is_admin', false)->get()->map(function($contactUser) use ($user) {
                // Check for last message
                $lastMessage = \App\Models\Message::where(function($q) use ($user, $contactUser) {
                    $q->where('sender_id', $user->id)->where('receiver_id', $contactUser->id);
                })->orWhere(function($q) use ($user, $contactUser) {
                    $q->where('sender_id', $contactUser->id)->where('receiver_id', $user->id);
                })->latest()->first();
    
                return [
                    'id' => $contactUser->id,
                    'name' => $contactUser->name,
                    'email' => $contactUser->email,
                    'avatar' => $contactUser->photo_path, 
                    'last_message' => $lastMessage ? $lastMessage->content : null,
                    'last_message_time' => $lastMessage ? $lastMessage->created_at->diffForHumans() : null,
                    'unread_count' => \App\Models\Message::where('sender_id', $contactUser->id)
                        ->where('receiver_id', $user->id)
                        ->whereNull('read_at')
                        ->count(),
                    'last_message_obj' => $lastMessage // Helpful for sorting
                ];
            })->sortByDesc(function($contact) {
                return $contact['last_message_obj'] ? $contact['last_message_obj']->created_at : null;
            })->values();

            return response()->json($users);
        }

        // If user is regular User, they chat with Admins
        // Get all admins.
        $admins = \App\Models\User::where('is_admin', true)->get()->map(function($adminUser) use ($user) {
            // Check for last message
            $lastMessage = \App\Models\Message::where(function($q) use ($user, $adminUser) {
                $q->where('sender_id', $user->id)->where('receiver_id', $adminUser->id);
            })->orWhere(function($q) use ($user, $adminUser) {
                $q->where('sender_id', $adminUser->id)->where('receiver_id', $user->id);
            })->latest()->first();

            return [
                'id' => $adminUser->id,
                'name' => $adminUser->name,
                'email' => $adminUser->email,
                'avatar' => $adminUser->photo_path, 
                'last_message' => $lastMessage ? $lastMessage->content : null,
                'last_message_time' => $lastMessage ? $lastMessage->created_at->diffForHumans() : null,
                'unread_count' => \App\Models\Message::where('sender_id', $adminUser->id)
                    ->where('receiver_id', $user->id)
                    ->whereNull('read_at')
                    ->count()
            ];
        });

        return response()->json($admins);
    }

    public function getMessages($userId)
    {
        $messages = \App\Models\Message::where(function($q) use ($userId) {
            $q->where('sender_id', auth()->id())->where('receiver_id', $userId);
        })->orWhere(function($q) use ($userId) {
            $q->where('sender_id', $userId)->where('receiver_id', auth()->id());
        })->orderBy('created_at', 'asc')->get();

        // Mark as read
        \App\Models\Message::where('sender_id', $userId)
            ->where('receiver_id', auth()->id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string'
        ]);

        $message = \App\Models\Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $validated['receiver_id'],
            'content' => $validated['content']
        ]);

        return response()->json($message);
    }
}
