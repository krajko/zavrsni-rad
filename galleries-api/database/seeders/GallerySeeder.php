<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Gallery::factory(60)->hasImages(1)->create();
    }
}
