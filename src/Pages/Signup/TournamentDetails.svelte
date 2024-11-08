<div class="mx-auto w-full max-w-sm lg:w-96">
    <div class="inline-flex text-gray-400">
        <span>
            <span class="material-icons">
                chevron_left
            </span>
        </span>
        <span class=" mx-2">Step 2/5</span>
        <span>
            <span class="material-icons">
                chevron_right
            </span>
        </span>
    </div>
    <div>
        <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Tournament details</h2>
    </div>

    <div class="mt-10">
        <div>
            <form action="#" method="POST" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Scale of Tournament</label>
                    <fieldset class="mt-2">
                        <legend class="sr-only">Notification method</legend>
                        <div class="space-y-4 sm:flex sm:items-center  sm:space-x-2 sm:space-y-0">
                            <div class="flex items-center">
                                <input id="ten_thousand" name="notification-method" type="radio" checked
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                <label for="ten_thousand"
                                    class="ml-3 block text-sm font-medium leading-6 text-gray-900">&lt; $10,000</label>
                            </div>
                            <div class="flex items-center">
                                <input id="fifty_thousand" name="notification-method" type="radio"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                <label for="fifty_thousand"
                                    class="ml-3 block text-sm font-medium leading-6 text-gray-900">&lt; $50,000</label>
                            </div>
                            <div class="flex items-center">
                                <input id="hundered_thousand" name="notification-method" type="radio"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                <label for="hundered_thousand"
                                    class="ml-3 block text-sm font-medium leading-6 text-gray-900">&lt; $100,000</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="block text-sm font-medium leading-6 text-gray-900">Where do you want to Showcase the
                        tournaments?</label>
                    <fieldset class="mt-4">
                        <legend class="sr-only">Notification method</legend>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <input id="own_channel" name="notification-method" type="radio" checked
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                <label for="own_channel"
                                    class="ml-3 block text-sm font-medium leading-6 text-gray-900">Own channels</label>
                            </div>
                            <div class="flex items-center">
                                <input id="thirdparty_channel" name="notification-method" type="radio"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                <label for="thirdparty_channel"
                                    class="ml-3 block text-sm font-medium leading-6 text-gray-900">Third party
                                    channels</label>
                            </div>
                            <div class="flex items-center">
                                <input id="client_channel" name="notification-method" type="radio"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                <label for="client_channel"
                                    class="ml-3 block text-sm font-medium leading-6 text-gray-900">Client
                                    channels</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="col-span-full">
                    <label for="organised_trnmnts" class="block text-sm font-medium leading-6 text-gray-900">Have you
                        ever organised any tournaments before?</label>
                    <div class="mt-2">
                        <textarea id="organised_trnmnts" name="organised_trnmnts" rows="1"
                            placeholder="Please paste your links here"
                            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="sponsor_brands" class="block text-sm font-medium leading-6 text-gray-900">Do you work
                        with any sponsor brands?</label>
                    <div class="mt-2">
                        <textarea id="sponsor_brands" name="sponsor_brands" rows="1"
                            placeholder="write sponsor names if any"
                            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Next</button>
                </div>
            </form>
        </div>
    </div>
</div>