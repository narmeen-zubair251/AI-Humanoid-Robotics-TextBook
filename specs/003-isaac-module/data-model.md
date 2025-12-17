# Data Model: Module 3: The AI-Robot Brain (NVIDIA Isaac™) Content

**Feature**: `003-isaac-module`
**Date**: 2025-12-12
**Spec**: specs/003-isaac-module/spec.md

## Overview

This document outlines the conceptual data model for the documentation content of Module 3 within the Docusaurus textbook project. It describes the primary entities involved in organizing and structuring the learning material.

## Entities

### Module

-   **Name**: Module 3: The AI-Robot Brain (NVIDIA Isaac™)
-   **Description**: A top-level organizational unit representing a major section of the textbook. It groups related chapters under a common theme.
-   **Attributes**:
    -   `title` (string): The human-readable title of the module (e.g., "The AI-Robot Brain (NVIDIA Isaac™)").
    -   `path` (string): The filesystem path where the module's chapters are stored (e.g., `my-book/docs/module-03-isaac/`).
-   **Relationships**:
    -   `contains`: One-to-many relationship with `Chapter` entities. A module contains multiple chapters.

### Chapter

-   **Name**: Chapter
-   **Description**: An individual markdown file that covers a specific topic or lesson within a module. Each chapter contributes to the overall learning objective of its parent module.
-   **Attributes**:
    -   `filename` (string): The name of the markdown file (e.g., `index.md`, `lesson-01-isaac-sim.md`).
    -   `title` (string): The title of the chapter, typically derived from the first heading in the markdown content.
    -   `content` (markdown text): The actual learning material, including explanations, examples, and illustrations, formatted in GitHub Flavored Markdown (GFM) suitable for Docusaurus.
    -   `path` (string): The full filesystem path to the chapter file.
-   **Relationships**:
    -   `belongs_to`: Many-to-one relationship with a `Module` entity. Each chapter belongs to exactly one module.
    -   `composed_of`: One-to-many relationship with `ContentElement` entities.

### ContentElement

-   **Name**: Content Element
-   **Description**: Represents atomic components of markdown content within a chapter, such as headings, paragraphs, lists, code blocks, images, and links.
-   **Attributes**:
    -   `type` (enum): Specifies the type of markdown element (e.g., `heading`, `paragraph`, `list_item`, `code_block`, `image`, `link`).
    -   `value` (string): The raw markdown string for the element.
    -   `properties` (object): Additional properties relevant to the element type (e.g., `level` for headings, `language` for code blocks, `src` for images).
-   **Validation Rules**:
    -   `syntax_compliance`: Each element must conform to GFM and Docusaurus markdown parsing rules.
    -   `nesting_rules`: Elements must adhere to proper markdown nesting, especially for lists and headings.
-   **Relationships**:
    -   `is_part_of`: Many-to-one relationship with a `Chapter` entity.

## No API Contracts

This feature focuses on documentation content generation for a static site, not the development of an application with external programmatic interfaces. Therefore, the concept of "API Contracts" (e.g., OpenAPI/GraphQL schemas) is not applicable here. There are no user actions that directly trigger API endpoints that need to be defined. The "user actions" are primarily navigation and reading within the Docusaurus site, which are handled by Docusaurus itself.
