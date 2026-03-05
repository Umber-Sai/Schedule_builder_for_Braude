# Schedule Calendar Extension

A Chrome extension that extracts lesson schedules from web pages and displays them in a visual calendar.

## Architecture

The code is organized into modules (classes):

- **`main.js`** — main entry point, initialization and calendar population
- **`config.js`** — `CalendarConfig` — configuration, styles, day mapping
- **`calendar.js`** — `Calendar` — creates a calendar element
- **`legend.js`** — `Legend` — creates a legend element with all added classes
- **`lesson.js`** — `Lesson` — lesson model with with DOM element and all props
- **`legend-item.js`** — `LegendItem` — legend item model with with DOM element and all props
- **`page-parser.js`** — `PageParser` — parses class info from the page

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `my-extension` folder
4. Open a page with a schedule — the calendar will appear in the upper right corner

## Usage

The extension automatically:
- Finds all schedule rows (selector `.TextAlignRight`)
- Parses data: lesson name, day, start/end time, teacher, classroom
- Displays lessons on a visual grid organized by day of the week

## Data Structure

Each lesson contains:
- `lessonName` — lesson name
- `dayName` — day in Hebrew (יום ראשון, יום שני, etc.)
- `startTime` — start time (HH:MM)
- `endTime` — end time (HH:MM)
- `teacher` — teacher name
- `classroom` — classroom number

## Extending the Code

To add new functionality:

1. **Add a new day or language** — update `dayMap` in `CalendarConfig`
2. **Change styles** — edit `getTemplateStyles()` in `CalendarConfig`
3. **Change parsing logic** — edit selectors in `LessonParser` or `CalendarConfig`
4. **Add features to the calendar** — extend the `Calendar` class
