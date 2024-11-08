<script>
  import { onMount, onDestroy } from 'svelte';
  import { RESTClient } from "../../Utils/RESTClient";
  import moment from 'moment';
  import { user } from '../../Stores/UserStore';

  const chatClient = new RESTClient("chat");

  let userObj = {};
  user.subscribe((value) => {
    userObj = value;
  });
  // chat types only have two types vendor or toursnament  restrict only these two values 
  export let chatType = "vendor"; // vendor or tournament

  $: replyAPI = chatType === "vendor" ? "addVendorReplyMessage" : "addTournamentReplyMessage";

  export let id;
  // fetch threads on vendor object available
  $:fetchThreads(id);

  let threads = [];
  let newThreadText = '';
  let newComment = {};
  let showLoader = false; 

 // Helper function to get initials
 function getInitials(firstName, lastName) {
  if (!firstName && !lastName) {
    return '';
  }
  
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }

  // Fetch threads from API
  async function fetchThreads(id) {
    if (!id) {
      return;
    }
    try {
      const response = await chatClient.get(`/${chatType}/${id}`, showLoader);
      if (response.code) {
        console.error("Error fetching threads: ", response.message);
        return;
      }
      // Ensure response is an array
      if (Array.isArray(response)) {
        threads = response.map((thread, index) => {
          if (!thread.id) {
            thread.id = index; 
          }
          return thread;
        });
        // Sort threads by date
        threads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        console.error("Unexpected response format: ", response);
      }
    } catch (error) {
      console.error("Error fetching threads: ", error);
    }
  }


  async function postThread() {
    if (newThreadText.trim()) {
      try {
        const response = await chatClient.post(`/${chatType}`, { 'id' : id, "message": { message: newThreadText } }, showLoader);
        if (response.code) {
          console.error("Error posting thread: ", response.message);
          return;
        }
        if(id) fetchThreads(id);
        newThreadText = '';
      } catch (error) {
        console.error("Error posting thread: ", error);
      }
    }
  }

  async function postComment(threadId) {
    if (newComment[threadId]?.trim()) {
      try {
        const response = await chatClient.post(`/${replyAPI}`, { "message": newComment[threadId], "threadId": threadId }, showLoader);
        if (response.code) {
          console.error("Error posting comment: ", response.message);
          return;
        }
        threads = threads.map(thread => {
          if (thread._id === threadId) {
            if (!response.id) {
              response.id = thread.messages.length; // Assign a unique key if not provided by API
            }
            response.sender = { firstName : userObj.firstName , lastName : userObj.lastName}
            return { ...thread, messages: [...thread.messages, response] };
          }
          return thread;
        });
       if(id) fetchThreads(id);
        newComment = {};
      } catch (error) {
        console.error("Error posting comment: ", error);
      }
    }
  }

  function formatDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

   // Fetch threads from API on mount
   onMount(async () => {
    if(id) fetchThreads(id);
  });
    let interval = setInterval(() => {
      fetchThreads(id);
    }, 60000);
    onDestroy(() => {
      clearInterval(interval);
    });
</script>
<div class="mx-auto max-w-screen-sm antialiased bg-white p-2 px-5 rounded-lg">
  <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
  <div class="space-y-4 overflow-y-auto h-[55vh]">
    {#if threads && threads.length }
        {#each threads as thread}
        <div class="relative flex">
          <span class="absolute left-5 top-5 z-10 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <div class="mr-3 flex-shrink-0 z-20">
            <div class="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10 {thread.message.senderType === "admin" ? "bg-teal-700" : " bg-pink-700" } flex items-center justify-center text-white font-bold">
              {getInitials(thread.message.sender.firstName, thread.message.sender.lastName)}
            </div>
          </div>
          <div class="flex-1 rounded-lg py-2 leading-relaxed px-2 sm:py-4">
            <strong class=" capitalize">{thread.message.sender.firstName} {thread.message.sender.lastName}</strong>
            <p class="text-sm">{thread.message.message}</p>
            <span class="text-xs text-gray-400">{ formatDate(thread.createdAt) }</span>
            <div class="space-y-4">
              {#if thread.messages && thread.messages.length && thread.messages[0].sender}
                  {#each thread.messages as comment}
                  <div class="flex">
                    <div class="mr-3 flex-shrink-0">
                      <div class="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10 {comment.senderType === "admin" ? "bg-teal-700" : " bg-pink-700"} flex items-center justify-center text-white font-bold">
                        {getInitials(comment.sender.firstName, comment.sender.lastName)}
                      </div>
                    </div>
                    <div class="flex-1 rounded-lg py-2 leading-relaxed px-2 sm:py-4">
                      <div class="flex items-center justify-between">
                        <p><strong class=" capitalize">{comment.sender.firstName} {comment.sender.lastName}</strong></p>
                      </div>
                      <p class="text-xs sm:text-sm">{comment.message}</p>
                      <span class="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                {/each}
              {/if}
              <div class="flex">
                <div class="mr-3 flex-shrink-0">
                  <div class="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10 bg-pink-700 flex items-center justify-center text-white font-bold">
                    {getInitials(userObj.firstName, userObj.lastName )}
                  </div>
                </div>
                <div class="flex-1 rounded-lg py-2 leading-relaxed px-2 sm:py-4">
                  <form on:submit|preventDefault={() => postComment(thread._id)}>
                    <label for="comment" class="sr-only">Comment</label>
                    <textarea rows="2" name="comment" id="comment" class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" placeholder="Type your comment here" bind:value={newComment[thread._id]}></textarea>
                    <div class="mt-2 flex justify-end">
                      <button type="submit" class="inline-flex items-center rounded-md bg-indigo-100 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg--200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200">Comment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
    
  </div>
  <div class="mx-auto rounded-lg py-2 bg-gray-200 leading-relaxed px-2 sm:px-2 sm:py-2 max-w-screen-sm antialiased">
    <div class="flex">
      <div class="mr-3 flex-shrink-0">
        <div class="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10 bg-pink-700 flex items-center justify-center text-white font-bold uppercase">
          {getInitials(userObj.firstName, userObj.lastName )}
        </div>
      </div>
      <div class="flex-1 rounded-lg py-2 leading-relaxed px-2 sm:px-2 sm:py-4">
        <form on:submit|preventDefault={postThread}>
          <label for="new-thread" class="sr-only">Thread</label>
          <textarea rows="2" name="new-thread" id="new-thread" class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" placeholder="Type your comment here" bind:value={newThreadText}></textarea>
          <div class="mt-2 flex justify-end">
            <button type="submit" class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
