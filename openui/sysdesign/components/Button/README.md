# Button

A labelled action: one primary per view, secondary for alternatives, tertiary for low-weight actions, and a destructive set for anything that deletes or removes.

## Use

- **Primary** (`openui-button-base-primary`): the single action the view exists for (Save changes, Create project). Never two primaries side by side.
- **Secondary**: the alternatives beside a primary (Cancel, Invite teammates, Export).
- **Tertiary**: quiet actions in toolbars and dense rows (Skip for now, Show more).
- **Destructive primary**: the confirm button inside a delete dialog. **Destructive secondary/tertiary**: entry points to removal (Remove member) before confirmation.

## Markup

```html
<button class="openui-button-base openui-button-base-primary openui-button-base-medium">
  <svg …/>New project
</button>
```

The consumer provides: the label (a verb, sentence case), an optional leading 16px Lucide icon as the first child, and `disabled` when the action is unavailable. Combine one variant class with one size class.

| Size | Class | Padding | Radius | Text |
|---|---|---|---|---|
| Extra small | `-extra-small` | 4.25px × `openui-space-s` | `openui-radius-s` | `label-sm` |
| Small | `-small` | 6.25px × `openui-space-s-m` | `openui-radius-s` + 1px | `label-sm` |
| Medium | `-medium` | 7px × `openui-space-s-m` | `openui-radius-m` | `label-default` |
| Large | `-large` | 9px × `openui-space-m` | `openui-radius-l` | `label-default` |

## Behaviour

- Primary and secondary rest on `openui-shadow-m` and go flat on hover; hover fills come from `openui-interactive-accent-hover` and `openui-highlight`.
- Transitions run 120ms ease on every property.
- Keyboard focus shows a 2px `openui-border-interactive-selected` outline at 2px offset (Graphite addition; see README).

## Don't

- Don't use a destructive primary outside a confirmation step.
- Don't put icons on the trailing side except a chevron for menus.
- Don't recolor buttons per page; brand comes only from `openui-interactive-accent-default`.

Hand-written from `packages/react-ui/src/components/Button/button.scss`.
