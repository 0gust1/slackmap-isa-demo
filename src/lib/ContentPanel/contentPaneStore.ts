/**
 * Reactive data store managing the content lifecycle of the content panel
 */

import { writable, derived } from 'svelte/store';

// UI state-related
export const contentPaneOpen = writable(false);
export const contentLoading = writable(true);

// reference id (in the API) of the content displayed
export const spotReferenceId = writable(null);

// reactive derived store: fetch the related content when the referenceId cahnges
export const contentFromAPI = derived(spotReferenceId, ($spotReferenceId, set) => {
  if ($spotReferenceId) {
    contentLoading.set(true);
    const API_CONTENT_ENDPOINT = `api/content/${$spotReferenceId}`;
    fetch(API_CONTENT_ENDPOINT)
      .then((r) => r.json())
      .then((data) => {
        contentLoading.set(false);
        return set(data);
      });
  } else {
    set({});
    contentLoading.set(false);
  }
});
