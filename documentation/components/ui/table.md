# Table Component

The Table component is a structured data display solution consisting of three coordinated components (Table, TableRow, and TableCell) designed to render tabular data from Storyblok CMS.

## Purpose

- Display structured data in a tabular format
- Provide consistent styling for table headers and data cells
- Support responsive table layouts across device sizes
- Allow for embedding custom content within table cells
- Integrate with Storyblok CMS for content management

## Core Functionalities

1. **Structured Layout**: Creates a standard HTML table structure with rows and cells
2. **Header Support**: Automatically handles table headers (first row)
3. **Responsive Behavior**: Adapts layout for different screen sizes
4. **Component Composition**: Uses three nested components for table, row, and cell
5. **Content Flexibility**: Allows any component to be embedded within cells
6. **Visual Styling**: Provides consistent styling with hover effects

## Component Structure

The Table component is composed of three related components:

1. **Table**: The parent container that defines the overall table structure
2. **TableRow**: Represents a row of data, with special handling for header rows
3. **TableCell**: Individual data or header cells that can contain nested components

## Component Options

### Table Component Options

- **table_rows**: Array of TableRow components to render

### TableRow Component Options

- **table_cells**: Array of TableCell components to render in this row

### TableCell Component Options

- **cell_content**: Array of components to render within the cell

## Code Examples

### Basic Table Structure

```svelte
<Table blok={{
  _uid: "table-1",
  component: "table",
  table_rows: [
    {
      _uid: "header-row",
      component: "table_row",
      table_cells: [
        {
          _uid: "header-cell-1",
          component: "table_cell",
          cell_content: [
            {
              _uid: "header-text-1",
              component: "text",
              text_type: "span",
              text_style: "para5",
              content: "Header 1"
            }
          ]
        },
        {
          _uid: "header-cell-2",
          component: "table_cell",
          cell_content: [
            {
              _uid: "header-text-2",
              component: "text",
              text_type: "span",
              text_style: "para5",
              content: "Header 2"
            }
          ]
        }
      ]
    },
    {
      _uid: "data-row-1",
      component: "table_row",
      table_cells: [
        {
          _uid: "data-cell-1-1",
          component: "table_cell",
          cell_content: [
            {
              _uid: "data-text-1-1",
              component: "text",
              text_type: "span",
              text_style: "para5",
              content: "Data 1-1"
            }
          ]
        },
        {
          _uid: "data-cell-1-2",
          component: "table_cell",
          cell_content: [
            {
              _uid: "data-text-1-2",
              component: "text",
              text_type: "span",
              text_style: "para5",
              content: "Data 1-2"
            }
          ]
        }
      ]
    }
  ]
}} />
```

### Table with Mixed Content Types

```svelte
<Table blok={{
  _uid: "mixed-content-table",
  component: "table",
  table_rows: [
    /* Header row */
    {
      _uid: "header-row",
      component: "table_row",
      table_cells: [
        /* Header cells */
      ]
    },
    /* Data row with text and image */
    {
      _uid: "mixed-row",
      component: "table_row",
      table_cells: [
        {
          _uid: "text-cell",
          component: "table_cell",
          cell_content: [
            {
              _uid: "cell-text",
              component: "text",
              text_type: "p",
              text_style: "para5",
              content: "Text content"
            }
          ]
        },
        {
          _uid: "image-cell",
          component: "table_cell",
          cell_content: [
            {
              _uid: "cell-image",
              component: "image",
              image: {
                filename: "https://example.com/image.jpg",
                alt: "Example image"
              },
              aspect_ratio: "1:1",
              max_width: "small"
            }
          ]
        }
      ]
    }
  ]
}} />
```

## Implementation Notes

- Uses semantic HTML table elements (`<table>`, `<thead>`, `<tr>`, `<th>`, `<td>`)
- First row is automatically rendered as a header row with `<thead>` and `<th>` elements
- Applies consistent styling with border and background colors
- Includes hover effects on rows to improve readability
- Uses responsive utilities to hide certain columns on smaller screens
- Cells in columns 3 and 4 (indexes 2 and 3) are hidden on mobile but visible on larger screens
- Table has fixed column widths with `table-fixed` class
- Cells can contain any Storyblok component, enabling flexible content structure
- Renders with rounded corners and handles overflow appropriately

## List of All Option Names

### Table Component
- table_rows

### TableRow Component
- table_cells 

### TableCell Component
- cell_content