<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RunForecast extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'forecast:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $python = "E:\\laragon\\www\\toska\\AI_Prediction\\venv\\Scripts\\python.exe";
        $script = "E:\\laragon\\www\\toska\\AI_Prediction\\server.py";

        $output = shell_exec("$python $script");

        $this->info($output);
    }
}
