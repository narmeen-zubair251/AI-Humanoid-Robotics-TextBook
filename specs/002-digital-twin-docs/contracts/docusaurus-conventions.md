# Docusaurus Markdown Conventions: Module 2: The Digital Twin Documentation

**Feature Branch**: `002-digital-twin-docs` | **Date**: December 12, 2025 | **Spec**: [link to spec.md]

## Introduction

This document outlines the Docusaurus-specific Markdown syntax, directives, and conventions that should be adhered to when creating content for "Module 2: The Digital Twin (Gazebo & Unity)". Following these conventions ensures proper rendering, navigation, and functionality within the Docusaurus site.

## Core Markdown Features

-   **Headings**: Standard Markdown headings (`#`, `##`, `###`, etc.) are fully supported.
    -   `#` for page title (usually handled by front matter `title`).
    -   `##` for main sections.
    -   `###` for sub-sections.
-   **Paragraphs, Lists, Blockquotes, Code Blocks**: Standard Markdown syntax applies.
-   **Links**:
    -   **Internal Links**: Use relative paths for linking between documentation pages within Docusaurus.
        -   Example: `[Introduction to Digital Twins](../chapter-01-introduction/index.md)` or `[Introduction to Digital Twins](../chapter-01-introduction)`
        -   For links within the same file, use anchor links: `[Content Data Model](#content-data-model)`
    -   **External Links**: Standard Markdown `[text](URL)`.
-   **Images**: Standard Markdown `![Alt text](path/to/image.png)`.
    -   Consider using the Docusaurus `@site` alias for paths (e.g., `![Alt text](@site/static/img/my-image.png)`).

## Docusaurus-Specific Features

### 1. Front Matter

YAML front matter is used to configure page-specific metadata. Each `index.md` file should include, at minimum:

```yaml
---
title: My Chapter Title
sidebar_label: My Chapter Title (for sidebar display)
slug: /my-chapter-slug # Optional, defines custom URL path
---
```

### 2. Admonitions (Callouts)

Docusaurus provides custom admonition components for notes, tips, warnings, etc.

-   **Note**:
    ```markdown
    :::note
    This is an important note.
    :::
    ```
-   **Tip**:
    ```markdown
    :::tip
    Here's a helpful tip.
    :::
    ```
-   **Warning**:
    ```markdown
    :::warning
    Be careful with this operation.
    :::
    ```
-   **Danger**:
    ```markdown
    :::danger
    This action is irreversible!
    :::
    ```

### 3. Tabs

Useful for showing code examples in different languages or configurations.

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="cli" label="CLI">
    ```bash
    docusaurus build
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript" default>
    ```javascript
    console.log('Hello Docusaurus!');
    ```
  </TabItem>
</Tabs>
```

### 4. Code Block Titles and Lines Highlighting

```markdown
```python title="my_script.py" {1,5-7}
# Highlight line 1 and lines 5 to 7
def greet(name):
    print(f"Hello, {name}!")

if __name__ == "__main__":
    greet("World")
    # Another line
```

### 5. Multi-language Support (if applicable)

If the documentation is to be translated, ensure content is written in a way that facilitates translation and utilize Docusaurus's i18n features.

## Sidebar Configuration

The navigation sidebar for Module 2 will be automatically generated based on the directory structure and front matter. Ensure `_category_.json` files are used in parent directories to define categories and order if custom sorting is required.

Example `_category_.json` in `my-book/docs/module-02-digital-twin/`:

```json
{
  "label": "Module 2: The Digital Twin",
  "position": 2,
  "link": {
    "type": "generated-index",
    "title": "Module 2 Overview"
  }
}
```
