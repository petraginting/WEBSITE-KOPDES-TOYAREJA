<?php

namespace App\Console;

use App\Console\Commands\RunForecast;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        Log::info('Scheduler aktif');
        $schedule->command('forecast:run')
            ->everyMinute()
            ->appendOutputTo(storage_path('logs/forecast.log'));
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }

    protected $commands = [
        RunForecast::class,
    ];
}