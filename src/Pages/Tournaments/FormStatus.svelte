<script>
    import { onMount } from "svelte";
    import { router } from "tinro";
    import { RESTClient } from "../../Utils/RESTClient";
    import Toast from "../../Services/ToastService";

    export let params = {};
    let isSubmitting = false;
    let error = null;
    const rest = new RESTClient("tournament");
    const showLoader = false;

    function apply(){
        
        rest
            .put(`/apply/${params.id}`,{termsAndConditions:true,vendor:params.id,status:"applied",dateApplied: new Date()}, showLoader)
            .then((res) => {
                if(!res.message){
                    isSubmitting = false;
                    Toast.success("Tournament applied successfully")
                }
                else{
                    error = res.message;
                    Toast.error(res.message);
                }
            })
    }

    function goToDashboard(){
        router.goto('/tournaments/')
    }

    function goToNewForm(){
        router.goto('/tournaments/tournament-application')
    }

    onMount(()=>{
        if(params.id!=""){
            isSubmitting = true;
            rest.get(`/tournament/${params.id}`, showLoader)
            .then((res)=>{
                if(!res.message){
                    if(res.status==="contact-information"){
                        apply();
                    }
                    else{
                        router.goto('/tournaments')
                    }
                }
                else{
                    router.goto("/tournaments")
                }
            })
            
        } else {
            router.goto('/tournaments')
        }
    })
</script>

<div class="flex flex-col items-center justify-center h-full bg-gray-100">
    {#if !error}
        {#if !isSubmitting}
            <div class="text-center">
                <div class="mb-4">
                    <svg class="w-5 h-5 text-green-500 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM18.7071 8.70711L11 16.4142L7.29289 12.7071L8.70711 11.2929L11 13.5858L17.2929 7.29289L18.7071 8.70711Z" />
                    </svg>
                </div>
                <h1 class="text-xl font-bold mb-2">Form submitted successfully</h1>
                <p class="text-gray-600 mb-6 text-sm font-bold">We will notify you once your tournament is approved by our team</p>
                <div class="flex justify-center font-bold gap-4 text-xs">
                    <button on:click={goToDashboard} class="bg-white text-black border border-gray-300 py-2 px-4 rounded-lg">Go to dashboard</button>
                    <button on:click={goToNewForm} class="bg-black text-white py-2 px-4 rounded-lg">Submit new form</button>
                </div>
            </div>
        {/if}
        {#if isSubmitting}
            <div class="text-center">
                <div class="mb-4 flex justify-center">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                <h1 class="text-xl font-bold mb-2"> Your form is being submitted..</h1>
                <p class="text-gray-600 mb-6 text-sm font-bold">Do not close or refresh your browser</p>
            </div>
        {/if}
        {:else}
            <div class="text-center">
                <div class="mb-4 flex justify-center">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <h1 class="text-xl font-bold mb-2">Form submission failed!</h1>
                <p class="text-gray-600 mb-6 text-sm font-bold"> We were unable to submit your form due to technical error</p>
                <div class="flex justify-center font-bold gap-4 text-xs">
                    <button on:click={apply} class="bg-white text-black py-2 px-4 rounded-lg">Try again</button>
                </div>
            </div>
    {/if}
</div>