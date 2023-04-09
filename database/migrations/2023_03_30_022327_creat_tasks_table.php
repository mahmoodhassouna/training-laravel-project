<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name',190);
            $table->text('description');
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->enum('priority',['عاجلة وهامة','هامة لكنها ليست عاجلة',
                'عاجلة لكنها ليست هامة','ليست عاجلة أو هامة','بدون أولوية']);
            $table->dateTime('starting_date');
            $table->dateTime('ending_date');
            $table->dateTime('remaindering_date');
            $table->integer('completion_rate');
            //1 active
            $table->integer('status')->default(1);
            $table->boolean('is_active')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
