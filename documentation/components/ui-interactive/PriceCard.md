# PriceCard

The PriceCard component creates a visually distinctive pricing card for displaying product or service tiers. It comes with comprehensive styling, recommended tier highlighting, and integrated payment options through Stripe or custom URLs.

## Purpose

- Display pricing information in a clear, structured format
- Highlight recommended pricing tiers to guide user decisions
- Showcase product/service features and benefits
- Provide direct conversion paths through integrated payment buttons
- Create visually appealing pricing sections with consistent styling

## Core Functionalities

1. Displays a structured pricing card with title, price, description, and features
2. Supports highlighting a "recommended" pricing tier with distinct styling
3. Renders a list of features with checkmark icons
4. Integrates with either Stripe checkout or custom URL buttons
5. Provides responsive design for various screen sizes
6. Works with Storyblok CMS for content management

## Component Options

### Basic Options

| Property | Type | Description |
|----------|------|-------------|
| title | String | Title of the pricing tier |
| price | StoryblokComponent[] | Price display (rendered via Storyblok component) |
| price_helper_text | String | Optional text below the price (e.g., "Save 10%") |
| description | String | Brief description of the pricing tier |
| is_recommended | Boolean | Whether this pricing tier should be highlighted as recommended |
| points | String[] | Array of features/benefits included in this pricing tier |
| button | StoryblokComponent | Either a PriceCardStripeBtn or PriceCardUrlBtn component |

### PriceCardStripeBtn Options

| Property | Type | Description |
|----------|------|-------------|
| label | String | Button text label |
| price_id | String | Stripe price ID for checkout |
| btn_theme | String | Button theme (primary/secondary) |

### PriceCardUrlBtn Options

| Property | Type | Description |
|----------|------|-------------|
| label | String | Button text label |
| url | Object | URL configuration from Storyblok multilink |
| btn_theme | String | Button theme (primary/secondary) |

## Code Examples

### Basic Price Card with URL Button

```svelte
<!-- In Storyblok -->
<PriceCard
  title="Basic Plan"
  price={[Text Component with "$19/month"]}
  price_helper_text="Billed annually"
  description="Perfect for individuals"
  is_recommended={false}
  points={[
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ]}
  button={PriceCardUrlBtn with configuration}
/>
```

### Recommended Price Card with Stripe Button

```svelte
<!-- In Storyblok -->
<PriceCard
  title="Pro Plan"
  price={[Text Component with "$49/month"]}
  price_helper_text="Save 20%"
  description="Ideal for small teams"
  is_recommended={true}
  points={[
    "All Basic features",
    "Advanced feature 1",
    "Advanced feature 2",
    "Priority support"
  ]}
  button={PriceCardStripeBtn with configuration}
/>
```

## Implementation Notes

### PriceCard Component

- Uses a card layout with distinct styling for the recommended tier
- Applies border styling differently based on the is_recommended property
- Recommended cards have a star icon and "Recommended" badge
- Features are displayed with checkmark icons
- Responsive design adjusts padding and spacing at different breakpoints

### PriceCardStripeBtn Component

- Opens a dialog for email collection before checkout
- Validates email format before proceeding
- Stores email in localStorage for future use
- Submits to the Stripe checkout endpoint with the provided price_id
- Handles loading states during the checkout process

### PriceCardUrlBtn Component

- Simple button that links to the provided URL
- Styling changes based on whether the parent card is recommended
- Uses the Button component internally with configured themes