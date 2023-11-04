---
title: "Contact"
date: 2023-11-01T21:07:18-04:00
draft: false
---
<div class="w-full max-w-screen-md mx-auto pt-8 pb-16 px-4">
    <h1 class="text-3xl mb-4">Contact Us</h1>
    <p class="">Whether you have questions, suggestions, or just want to say hello, we'd love to hear from you!</p>
    <br>
    <form action="#" netlify method="POST">
        <div class="mb-4">
            <label for="name" class="block text-gray-600 font-semibold">Name</label>
            <input type="text" id="name" name="name" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required>
        </div>
        <div class="mb-4">
            <label for="email" class="block text-gray-600 font-semibold">Email</label>
            <input type="email" id="email" name="email" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required>
        </div>
        <div class="mb-4">
            <label for="message" class="block text-gray-600 font-semibold">Message</label>
            <textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" required></textarea>
        </div>
        <div class="mt-6">
            <button type="submit" class="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-700 focus:outline-none focus:ring focus:border-blue-300">Submit</button>
        </div>
    </form>
</div>
