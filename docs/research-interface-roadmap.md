# Research Interface Roadmap

This website is both an academic profile and a laboratory for better mathematical research communication.

The guiding sequence is:

> research question → intuition → interaction → mathematics → implementation → evidence → code

A visitor should be able to stop at any point and still leave with a coherent understanding of what the project asks and why it matters.

## Editorial principles

### Write for clarity before compression

The site should prefer ordinary phrases over dense compound constructions. Hyphens and dashes are useful when they carry meaning, but they should not become the default rhythm of the prose.

Use a hyphen when it is part of a proper name, a repository name, a published title, or when removing it would make a phrase genuinely ambiguous. Otherwise, rewrite the sentence.

### Separate kinds of evidence

Every research page should distinguish among:

- a teaching example created to explain an idea;
- a method actually used in the research;
- a result already suitable for public dissemination;
- work that is still being prepared.

A schematic visual should never look like experimental evidence.

### Let readers choose depth

The same project can be explained at several levels:

1. **Intuition** for the scientific idea and motivation.
2. **Mathematics** for definitions, assumptions, maps, and formal structure.
3. **Implementation** for algorithms, code, numerical conventions, and reproducibility.

These views should describe the same research. They should not become separate versions with different claims.

## Pilot: Topology and Bone Fragility

### Stage 1: research question and conceptual structure

Status: **implemented**

The page now includes:

- a direct research question;
- a clear distinction between teaching content and unpublished results;
- explanations of H0, H1, and H2;
- a visible path from image volume to modelling;
- links to relevant public repositories;
- layered intuition, mathematics, and implementation views.

### Stage 2: linked filtration and persistence

Status: **implemented with synthetic data**

The teaching construction contains:

- one essential H0 class born at 18;
- one finite H0 interval [28, 45);
- one finite H1 interval [28, 68).

The interface lets a reader:

1. move the filtration threshold;
2. observe live Betti numbers;
3. inspect the corresponding persistence diagram;
4. see which finite classes are alive at the current threshold;
5. select a persistence point with a pointer or keyboard;
6. read its dimension, birth, death, persistence, and current state;
7. jump directly to its birth, an interior threshold, or its death;
8. inspect an explanatory witness in the grid.

The interface states explicitly that the highlighted witness is chosen for explanation. It is not presented as a unique canonical representative of the persistence class.

### Stage 3: public research figures

When the corresponding material can be made public:

- add selected micro CT figures that are approved for public dissemination;
- add a documented example scalar field;
- add a real persistence diagram or persistence image;
- connect each figure to specimen state, preprocessing, filtration, software version, and relevant manuscript material;
- provide meaningful text alternatives for every scientific visual.

Do not upload restricted or identifying data.

### Stage 4: interaction with public research examples

A later version can connect a public image example to a real diagram.

Possible interaction:

1. move through a real or approved example filtration;
2. update the persistence diagram;
3. select a persistence point;
4. display an appropriate geometric representative when one can be justified;
5. explain the representative and its nonuniqueness;
6. provide a text alternative for readers who cannot use the visual interaction.

### Stage 5: structure in three dimensions

A browser based view in three dimensions should be added only if it improves comprehension.

Requirements:

- all essential controls must be keyboard accessible;
- a nonvisual or static alternative must be available;
- reduced motion preferences must be respected;
- colour and rotation must not be the only carriers of information;
- performance must remain reasonable on ordinary laptops and mobile devices.

A sequence of slices or carefully chosen static figures is preferable if a 3D viewer adds complexity without adding understanding.

## Accessibility research

The interface should continue to be tested against questions such as:

- Can a keyboard user reach every control and explanation?
- Does the page remain understandable without colour?
- Are mathematical expressions represented semantically?
- Can a screen reader user understand the purpose and current state of an interactive mathematical figure?
- Is there a useful alternative when an interaction is intrinsically visual?
- Does reduced motion preserve every piece of information?

Native MathML is preferred where practical because it keeps mathematical structure in the document. Any fallback rendering approach should be tested with assistive technologies before adoption.

## Usability research

A future study could compare the research interface with a conventional project page centred on a paper.

Example tasks:

1. Explain the central research question in one sentence.
2. Identify what H0, H1, and H2 describe.
3. Find the software used for conventional morphometry.
4. Explain why a filtration is studied rather than a single threshold.
5. Locate the public code or evidence associated with a claim.

Possible observations include:

- task completion;
- time needed to locate information;
- navigation errors;
- comprehension responses;
- perceived effort;
- qualitative comments about terminology and visuals.

For any study intended for publication, institutional ethics requirements should be determined before participant data are collected.

## Reusable interface components

If the pilot continues to work well, reusable components can support other research pages:

- filtration controller;
- semantic mathematical display;
- progressive explanation tabs;
- research provenance chain;
- figure metadata panel;
- links between papers and code;
- accessible interactive chart wrapper;
- disclosure component for teaching examples and real research material.

The same design language can then support Ball Mapper, directional topology, bone morphometry, neural operators, and mathematical notes without rebuilding the interaction model for every page.
