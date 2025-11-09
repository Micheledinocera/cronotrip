<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Crea Nuovo Itinerario</h1>
    <UForm :validate="validate" :state="itinerario" class="space-y-4 p-2" @submit="onSubmit">
      <div class="grid md:grid-cols-2 gap-4">
        <UFormField name="name" label="name" required>
          <UInput
            size="xl"
            placeholder="name"
            v-model="itinerario.name"
            variant="subtle"
            class="w-full"
          />
        </UFormField>
        <UFormField
          name="short_desc"
          label="short_desc"
          :hint="itinerario.short_desc.length + '/50'"
          required
        >
          <UInput
            size="xl"
            placeholder="short_desc"
            v-model="itinerario.short_desc"
            variant="subtle"
            class="w-full"
          />
        </UFormField>
      </div>
      <UFormField
        name="desc"
        label="desc"
        :hint="itinerario.desc.length + '/100'"
        required
      >
        <UTextarea
          size="xl"
          placeholder="desc"
          v-model="itinerario.desc"
          variant="subtle"
          autoresize
          class="w-full"
        />
      </UFormField>
      <UFormField
        name="days"
        label="Giorni"
        required
      >
        <DaySelector 
          :days="itinerario.days" 
          v-model="selectedDayIndex" 
          @update-days="updateDays" 
          :with-controls="true" 
        />
      </UFormField>
      <ItineraryDayForm 
        v-if="itinerario.days[selectedDayIndex]"
        ref="dayFormRef"
        :day="itinerario.days[selectedDayIndex]!"
        :dayIndex="selectedDayIndex"
        @update:day="updateCurrentDay"
      />
      <UButton type="submit" class="px-4 py-2 rounded"> 
        Crea Itinerario 
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { ValidationError } from "app/types/validation";
import type { FormSubmitEvent } from "node_modules/@nuxt/ui/dist/module.mjs";

const selectedDayIndex:Ref<number> = ref(0);
const itinerario: Ref<Itinerary> = ref({
  name: "",
  short_desc: "",
  desc: "",
  days: [{subtitle:'Day 1',places:[]}],
});

const dayFormRef = ref<{ validate: () => ValidationError[] } | null>(null);

const validate = () => {
  const errors: ValidationError[] = [];
  
  if (!itinerario.value.name) errors.push({ name: "name", message: "Required" });
  if (!itinerario.value.short_desc)
    errors.push({ name: "short_desc", message: "Required" });
  if (itinerario.value.short_desc.length>50)
    errors.push({ name: "short_desc", message: "max 50" });
  if (!itinerario.value.desc) errors.push({ name: "desc", message: "Required" });

  if (dayFormRef.value) {
    const dayErrors = dayFormRef.value.validate();
    errors.push(...dayErrors);
  }

  return errors;
};

const onSubmit = async (event: FormSubmitEvent<Itinerary>) => {
  console.log(event.data);
};

const updateDays = (newDays: Day[]) => {
  itinerario.value.days = newDays;
};

const updateCurrentDay = (updatedDay: Day) => {
  itinerario.value.days[selectedDayIndex.value] = updatedDay;
};
</script>
