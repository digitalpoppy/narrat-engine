# Saving and Reloading

## Saving and Reloading

**Important:** The `saveFileName` key in the `config.yaml` file is the name of the save file, and if this value is changed old saves will stop working. Once you have chosen a save file name for a game, do not change it in the future. The name you use should contain the name of your game to avoid clashes with other games

## How saving works

Narrat supports automatic saving and reloading, but there are some important details worth knowing about.

How saves works:

- All relevant bits of the state are extracted into one object. This includes
- This object gets stored in the browser's [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- On game load, the local storage gets read for a save, and if present all the data above gets placed in the state to continue playing

::: tip
Because there is no way to identify which specific line of dialogue the player is on, **saving only saves the last label the player started,** not the exact line they reached
:::

## Save Slots

A save slot is an individual save file. Each game can have any amount of save slots. There are two different ways save slots are managed, depending on how the game is configured:

- `manual`: This is the default mode. In this mode, there is a single global auto save used no matter which save gets loaded, but manual saves won't be overwritten unless the player chooses to overwrite them. **TLDR: Only one global autosave.**. There is a fixed amount of save slots for the game. This is how most interactive fictions work.
- `game-slots`: An alternative mode where starting a new game will create an Autosave slot for that playthrough, which will keep getting overwritten as the player goes. Starting a new game creates a separate new autosave slot for that playthrough. When the player loads a slot, autosaves will overwrite that slot automatically **TLDR: One save slot per playthrough.** Example: Zelda, Dark Souls

This value can be changed in `config.yaml` in `saves.mode`:

```yaml
saves:
  mode: manual
  slots: 10
```

::: tip
If using `manual` mode, you should give the player a chance to create manual saves sometimes, as there is only one autosave which can get overwritten by starting a new game
:::

## Manual saving

To let the player save manually, there are two commands:

[save-commands.md](../commands/save-commands.md)

::: tip
Because save data is only generated when jumping to a new label, save prompts should ideally be at the start of a label. Otherwise, the data saved will be outdated.
:::

## Global Save Data

The engine now supports global save data. Global save data isn't associated with any save slot and is instead global for the entire game. This allows tracking meta data across multiple playthrough, or enabling features like achievements across multiple saves.

To use, set values in the `global` object instead of `data`. For example:

```narrat
main:
  talk player idle "hello world"
  add global.counter 1
  talk player idle "Global counter is %{$global.counter}"
```

Every time a new game is started, this script will increase the global counter despite it being a new save.

To reset global save data, use the `reset_global_save` command.

## Run a function on game load

Sometimes, you might need your game to edit data that can't be saved. For example games can dynamically change the config after starting. A common example would be changing the player's name:

```narrat
test_edit_config:
  set data.playerName (text_field "Enter your name")
  set config.characters.characters.player.name $data.playerName
```

This works fine, but if you reload the game, the player's name will be reset to its default as the game config gets loaded by the engine.

To be able to reapply your dynamic changes on every game reload, or to perform any task you want to perform when the player comes back after loading the game, you can use the `runOnReload` config key:

```yaml
saves:
  mode: manual
  slots: 10
  runOnReload: 'game_reload'
  autosaveDisabledOnLabels:
    - test_no_autosave
  # disabled: true
```

Then for example in the game code:

```narrat
main:
  jump ask_player_name

reset_config_overrides:
  set config.characters.characters.player.name $data.playerName

ask_player_name:
  set data.playerName (text_field "Enter your name")
  run reset_config_overrides
  run verify_edit_config

verify_edit_config:
  talk player idle "It's me, %{$config.characters.characters.player.name}"

game_reload:
  run set_config_overrides
  talk helper idle "The game reloaded, welcome back %{$config.characters.characters.player.name}"
  talk player idle "Wow it's me, and my name is still here!"
```

Without the `reset_config_overrides` function running on game load to add the appropriate values to the config, the player name in the config would still be its default value when reloading a save.

### The problem with saving a specific line

::: details Why we can only save on label change

We could save the dialog line number the player is at, but it would cause issues with game updates. Say the player is at line 53 of `some_script.narrat`, but you update the game and the code changes. Suddenly line 53 refers to a completely different bit of dialogue.

One solution could be to give every line of dialogue a unique identifier (which would also allow for localisation), but this would be very tedious for users and isn't planned at the moment.

The only viable solution for saving without risk of game updates breaking past saves

This means some dialogue will be replayed when a user reloads if they were halfway through a label, but it's only because the save was made at a point in time.

:::

## Disabling saves

```yaml
saves:
  disabled: true
```

Setting the `disabled` option to true in the saves config will remove the continue/load button, and remove the warning about erasing save slots when clicking on new game.

The game will still be saving in the background, but the player won't be able to load the save.

## Disabling autosave on specific labels

There are cases where you might want your game to _not_ autosave on specific labels. For example if there is a choice in your game that might softlock the player, you might want to prevent the player from autosaving after that choice.

To do that, add the `autosaveDisabledOnLabels` option to the saves config and list all the labels that should _not_ trigger an autosave.

```yaml
saves:
  autosaveDisabledOnLabels:
    - no_autosave
    - dont_save_this_label
    - please_dont_save_me
    - this_really_shouldnt_be_saved
    - no_dont_save_this_label_senpai_yamete_kudasai
```

## Saving spinner feedback UI

The game automatically shows a little spinner when saving. The spinner can be configured in the config and with CSS. The spinner is made of:

<video controls="controls" src="./saving/spinner.mp4" type="video/mp4" autoplay="true"></video>

- A background image
- A text
- A foreground image

Either of those 3 things can be individually disabled or customised. Here is an example config:

```yaml
saves:
  autosaveFeedback:
    enabled: true
    duration: 0.5
    text: saving...
    backgroundImage: 'img/ui/autosave_spinner_background.png'
    foregroundImage: 'img/ui/autosave_spinner.png'
```

Omitting any of `text`, `backgroundImage` or `foregroundImage` will make them simply not appear. The `duration` key is the time in seconds the spinner will be shown for. If setting `enabled` to false, the spinner will never appear.

To customise the display and animation of the spinner, override the CSS classes:

- `auto-save-feedback-container`: The position and size of the spinner
- `auto-save-feedback-text`: The text of the spinner
- `auto-save-feedback-background`: The background image of the spinner
- `auto-save-feedback-foreground`: The foreground image of the spinner

By default, the background and foreground both have a CSS animation to spin in opposite ways.

## Manual saves from menu

The system menu allows the player to create a manual save whenever they want. If you want to disable this option, add the `allowManualSave` option to the save config:

```yaml
saves
  allowManualSave: false
```
