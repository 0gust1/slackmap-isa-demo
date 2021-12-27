import { writable, derived } from "svelte/store";

export const contentPaneOpen = writable(false);
export const spotReferenceId = writable(null);
export const contentLoading = writable(true);
export const contentFromAPI = derived(spotReferenceId,($spotReferenceId, set)=>{
    if($spotReferenceId){
        contentLoading.set(true);
        const API_CONTENT_ENDPOINT = `api/content/${$spotReferenceId}`;
        fetch(API_CONTENT_ENDPOINT).then((r)=>r.json()).then((data)=>{
            contentLoading.set(false);
            return set(data);
        })
    } else {
        set({})
        contentLoading.set(false);
    }
})