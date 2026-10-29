<script setup lang="ts">
// No public home: `/` is the dashboard, and the auth middleware sends anyone not signed in to the login.
await navigateTo('/dashboard', {replace: true});
</script>
