<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'photo_path',
        'birthdate',
        'phone_number',
        'location',
        'location_enabled',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'birthdate' => 'date',
            'location_enabled' => 'boolean',
        ];
    }
    
    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class);
    }

    public function dailyMoods()
    {
        return $this->hasMany(DailyMood::class);
    }

    public function journalEntries()
    {
        return $this->hasMany(JournalEntry::class);
    }

    // Helper to calculate average mood score (1-5)
    public function getAverageMoodScore()
    {
        // 1. Daily Moods (already 1-5)
        // Take last 7 days to be relevant
        $recentMoods = $this->dailyMoods()
            ->where('created_at', '>=', now()->subDays(7))
            ->pluck('mood_level')
            ->toArray();

        // 2. Journal Entries (Emojis to Score)
        $recentJournals = $this->journalEntries()
            ->where('created_at', '>=', now()->subDays(7))
            ->whereNotNull('mood')
            ->pluck('mood')
            ->toArray();

        $journalScores = [];
        $emojiMap = [
            '😊' => 5, '😎' => 5, 
            'content' => 4, // Fallback if text
            '🤔' => 3, '😴' => 3, 
            '😰' => 2, '😔' => 2, 
            '😡' => 1, '😭' => 1
        ];

        foreach ($recentJournals as $emoji) {
            if (isset($emojiMap[$emoji])) {
                $journalScores[] = $emojiMap[$emoji];
            } else {
                // Default neutral for unknown
                $journalScores[] = 3; 
            }
        }

        $allScores = array_merge($recentMoods, $journalScores);

        if (count($allScores) === 0) {
            return null; // No sufficient data
        }

        return round(array_sum($allScores) / count($allScores), 1);
    }
}

