<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

// Users
Route::resource('users', UsersController::class)->except(['show'])->names([
    'index' => 'users',
])->middleware('auth');
Route::put('users/{user}/restore')->name('users.restore')->uses('UsersController@restore')->middleware('auth');

// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// Organizations
Route::get('organizations')->name('organizations')->uses('OrganizationsController@index')->middleware('remember', 'auth');
Route::get('organizations/create')->name('organizations.create')->uses('OrganizationsController@create')->middleware('auth');
Route::post('organizations')->name('organizations.store')->uses('OrganizationsController@store')->middleware('auth');
Route::get('organizations/{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit')->middleware('auth');
Route::put('organizations/{organization}')->name('organizations.update')->uses('OrganizationsController@update')->middleware('auth');
Route::delete('organizations/{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy')->middleware('auth');
Route::put('organizations/{organization}/restore')->name('organizations.restore')->uses('OrganizationsController@restore')->middleware('auth');

// Contacts
Route::get('contacts')->name('contacts')->uses('ContactsController@index')->middleware('remember', 'auth');
Route::get('contacts/create')->name('contacts.create')->uses('ContactsController@create')->middleware('auth');
Route::post('contacts')->name('contacts.store')->uses('ContactsController@store')->middleware('auth');
Route::get('contacts/{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit')->middleware('auth');
Route::put('contacts/{contact}')->name('contacts.update')->uses('ContactsController@update')->middleware('auth');
Route::delete('contacts/{contact}')->name('contacts.destroy')->uses('ContactsController@destroy')->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore')->middleware('auth');

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});
