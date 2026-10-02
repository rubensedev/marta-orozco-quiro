# Delta for Client-Reviews

## MODIFIED Requirements

### Requirement: Section placement and anchor

The homepage MUST render the client-reviews section after Rituals/Bonos and before the gift section (and therefore before Contact). The section root MUST expose `id="testimonios"` on Spanish pages (English reviews id unchanged if already localized elsewhere). Client-reviews MUST remain immediately before the gift section; Contact MUST NOT sit between reviews and gift.
(Previously: Client-reviews was required to appear after Rituals/Bonos and immediately before Contact with no intervening gift section.)

#### Scenario: DOM order before Gift and Contact

- GIVEN the homepage is rendered
- WHEN section order is inspected
- THEN Rituals appears before client-reviews
- AND client-reviews appears immediately before the gift section
- AND the gift section appears before Contact
- AND the reviews section has `id="testimonios"` on Spanish pages

### Requirement: Navigation entry

`navItems` MUST include the reviews item (ES `{ href: "#testimonios", label: "TESTIMONIOS" }` or the EN equivalent) immediately before the gift nav item (`REGALA` / `GIFT CARD`). Header MUST surface that item in desktop and mobile nav via `navItems` only. Reviews MUST NOT be immediately before Contact after the gift item is inserted.
(Previously: TESTIMONIOS was required immediately before Contact with no gift nav item between.)

#### Scenario: TESTIMONIOS precedes gift nav item

- GIVEN `navItems` is loaded
- WHEN the list is read in order
- THEN the reviews item appears immediately before the gift item (`REGALA` / `GIFT CARD`)
- AND Contact appears after the gift item
- AND activating the reviews item targets the reviews section hash
