# ArticleSortFilter

The ArticleSortFilter component provides a dropdown select interface for sorting articles by different criteria. It presents a clean, accessible UI for changing the sort order of article collections.

## Purpose

- Allow users to sort articles by different criteria (date, alphabetical)
- Provide a clean, accessible dropdown interface for sort selection
- Support customizable sort options for different article collections
- Maintain two-way binding with parent components for sort state
- Enhance user experience with visual feedback and animations

## Core Functionalities

1. Displays a dropdown menu with customizable sort options
2. Shows the currently selected sorting method
3. Provides visual feedback with animations and icons
4. Supports two-way binding to update parent component state
5. Implements accessible UI controls with proper ARIA attributes

## Component Options

### Required Props

| Property | Type | Description |
|----------|------|-------------|
| sortOptions | array | Array of sorting options (value/label pairs) |
| sortSelected | object | Binding for the currently selected sort option |
| sortOpen | boolean | Binding for dropdown open state |

### Sort Option Format

Each object in the `sortOptions` array should have:
- `value`: String identifier used in sorting logic
- `label`: Human-readable text displayed in the dropdown

### Example Sort Options Array

```javascript
[
  { value: 'date_newest', label: 'Date (Newest)' },
  { value: 'date_oldest', label: 'Date (Oldest)' },
  { value: 'alph_a-z', label: 'Alphabetical (A-Z)' },
  { value: 'alph_z-a', label: 'Alphabetical (Z-A)' }
]
```

## Code Examples

### Basic Usage

```svelte
<script>
  import { ArticleSortFilter } from '$lib/components/content';
  
  let sortSelected = { value: 'date_newest', label: 'Date (Newest)' };
  let sortOpen = false;
  
  const sortOptions = [
    { value: 'date_newest', label: 'Date (Newest)' },
    { value: 'date_oldest', label: 'Date (Oldest)' },
    { value: 'alph_a-z', label: 'Alphabetical (A-Z)' },
    { value: 'alph_z-a', label: 'Alphabetical (Z-A)' }
  ];
  
  $: console.log('Current sort:', sortSelected.value);
</script>

<ArticleSortFilter 
  {sortOptions}
  bind:sortSelected
  bind:sortOpen
/>
```

### Integration with Filtering

```svelte
<script>
  import { ArticleSortFilter } from '$lib/components/content';
  import { effect } from 'svelte';
  
  let articles = [...originalArticles];
  let sortSelected = { value: 'date_newest', label: 'Date (Newest)' };
  let sortOpen = false;
  
  const sortOptions = [
    { value: 'date_newest', label: 'Date (Newest)' },
    { value: 'date_oldest', label: 'Date (Oldest)' },
    { value: 'alph_a-z', label: 'Alphabetical (A-Z)' },
    { value: 'alph_z-a', label: 'Alphabetical (Z-A)' }
  ];
  
  // Apply sorting when selection changes
  $effect(() => {
    const sorted = [...articles];
    
    switch (sortSelected.value) {
      case 'date_newest':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date_oldest':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'alph_a-z':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alph_z-a':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    articles = sorted;
  });
</script>

<div class="filter-container">
  <ArticleSortFilter 
    {sortOptions}
    bind:sortSelected
    bind:sortOpen
  />
  
  <!-- Article list would go here -->
</div>
```

## Implementation Notes

- Uses the Bits UI Select component for accessible dropdown implementation
- Implements fly transition for smooth opening and closing animation
- Uses the Check icon to indicate the currently selected option
- Includes a rotating ChevronDown icon to indicate dropdown state
- Handles keyboard navigation with `closeOnEscape` property
- Uses `preventScroll` to avoid page jumping when the dropdown opens
- Implements `sameWidth: false` to allow the dropdown to size independently
- Positions the dropdown with `sideOffset` to create space between trigger and content
- Applies consistent styling with rounded corners and subtle shadows
- Uses Svelte's two-way binding for seamless state management
- Converts easily between standalone use and integration with the AllArticles component