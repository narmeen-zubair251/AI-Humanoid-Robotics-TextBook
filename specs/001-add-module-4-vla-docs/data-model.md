# Data Model: Vision-Language-Action (VLA) Module 4 Documentation

This feature is focused on content generation and organization within an existing Docusaurus documentation framework. The "data model" primarily describes the structure and properties of the markdown files themselves.

## Entities

### Document (Markdown File)

-   **Name**: `index.md`, `lesson-01-voice-to-action.md`, etc.
-   **Path**: `my-book/docs/module-04-vla/`
-   **Content**: Markdown text, including:
    -   Headings (H1, H2, H3, etc.)
    -   Bullet points/lists
    -   Code blocks (for examples)
    -   Diagrams (referenced via image paths)
    -   Plain text explanations
-   **Format**: Compatible with Docusaurus Markdown parsing (e.g., uses frontmatter for titles, categories, etc.)
-   **Relationships**: Chapters are part of `module-04-vla`. `index.md` serves as the introduction to the module.
