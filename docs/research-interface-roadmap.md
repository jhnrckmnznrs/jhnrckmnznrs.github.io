# Research Interface Roadmap

This document treats the website as both an academic profile and a laboratory for better
mathematical research communication.

The guiding principle is progressive disclosure:

> research question → intuition → mathematics → interaction → implementation → evidence → code

The website should remain useful when JavaScript is unavailable and should not require a reader
to understand every mathematical layer before reaching the information they need.

## Pilot: Topology and Bone Fragility

### Phase 1 — conceptual interface

Status: **implemented in the redesign branch**

- dedicated research page;
- plain-language research question;
- separate descriptions of H0, H1, and H2;
- interactive two-dimensional filtration toy model;
- live component and void counts;
- explicit warning that the toy example is not patient data;
- progressive Intuition / Mathematics / Implementation views;
- mathematical definitions rendered with native MathML;
- visible research-provenance pipeline;
- links to relevant public repositories;
- manuscript-level numerical results deliberately withheld while the work is not yet public.

### Phase 2 — public research figures

When the corresponding results can be made public:

- replace or complement schematic visuals with selected real micro-CT figures;
- add a clearly documented example scalar field;
- show a real persistence diagram or persistence image;
- add figure-level provenance: specimen state, preprocessing, filtration, software version,
  and relevant manuscript figure/table reference;
- provide text alternatives for each scientific visual.

Do not upload identifiable or restricted data. Public examples should use data that are already
approved for public dissemination or deliberately generated synthetic examples.

### Phase 3 — linked topology interaction

Status: **implemented for the synthetic teaching construction**

The pilot now:

1. moves through a deliberately constructed filtration with known positive-persistence classes;
2. displays the corresponding finite persistence points;
3. lets the reader select a persistence point by mouse or keyboard;
4. reports dimension, birth, death, persistence, and whether the class is alive at the current threshold;
5. provides controls to jump to the birth, an interior threshold, or the death of the selected class;
6. highlights an explanatory witness in the grid;
7. states explicitly that the highlighted witness is not a unique canonical representative of the persistence class;
8. lists the essential H0 class separately because its death time is infinite.

The teaching construction uses one finite H0 interval [28, 45), one finite H1 interval [28, 68),
and one essential H0 class born at 18. It remains synthetic and must not be presented as an
experimental result.

### Phase 4 — three-dimensional structure

Explore a lightweight browser-based 3-D view only if it improves comprehension.

Requirements:

- keyboard-operable controls;
- a non-3-D alternative;
- reduced-motion behaviour;
- no essential information encoded only by rotation, colour, or animation;
- reasonable performance on ordinary laptops and mobile devices.

A static or slice-based explanation is preferable if a 3-D viewer adds complexity without
improving understanding.

## Accessibility research

The interface should be developed against questions such as:

- Can a keyboard-only user reach every explanation and control?
- Does the page remain understandable without colour?
- Are mathematical expressions exposed semantically rather than only as images?
- Can a screen-reader user understand the purpose and state of an interactive mathematical figure?
- Is there a useful alternative when an interaction is intrinsically visual?
- Does reduced-motion mode preserve all information?

Native MathML is preferred where practical because it keeps mathematical structure in the document.
Rendered fallback approaches should be evaluated with assistive technologies before adoption.

## Usability research

A future small usability study could compare the research interface with a conventional
paper-first project page.

Example tasks:

1. Explain the central research question in one sentence.
2. Identify what H0, H1, and H2 describe.
3. Find the software used for conventional morphometry.
4. Explain why a filtration is used rather than a single threshold.
5. Locate the paper, code, or public evidence associated with a claim.

Possible measurements:

- task completion;
- time to locate information;
- navigation errors;
- comprehension responses;
- perceived workload;
- qualitative comments on confusing terminology or visuals.

For any study intended for publication, determine institutional ethics requirements before
collecting participant data.

## Content modes

The current three modes are intentionally audience-oriented rather than expertise labels.

### Intuition

For a reader who wants the scientific idea without formal prerequisites.

### Mathematics

For a reader who wants definitions, maps, assumptions, and mathematical structure.

### Implementation

For a reader who wants to know how the mathematics is converted into a reproducible computational
workflow.

The three modes should describe the same research faithfully. They should not become separate,
contradictory versions of the project.

## Evidence policy

The site should distinguish among:

- **conceptual demonstrations** — created to explain an idea;
- **research methods** — methods actually used in the project;
- **public results** — results already suitable for public dissemination;
- **work in progress** — described without prematurely releasing manuscript-level findings.

A visual should never look like an experimental result if it is only schematic.

## Reusable components

If the pilot succeeds, extract reusable components for other research pages:

- filtration controller;
- semantic mathematical display;
- progressive explanation tabs;
- research pipeline / provenance chain;
- figure metadata panel;
- code-and-paper links;
- accessible interactive chart wrapper;
- “conceptual / real data” disclosure component.

The same design system can then support Ball Mapper, directional topology, bone morphometry,
neural operators, and teaching notes without rebuilding interaction patterns independently.
