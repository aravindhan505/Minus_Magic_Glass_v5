import { playNarratorSrc, type NarratorPlaybackOptions } from "@/lib/audio"

/** Level 2 narrator clips live in public/audio/level_2/ */
export const LEVEL2_AUDIO_BASE = "/audio/level_2"

export const LEVEL2_HINT_AUDIO = [
  "narrator_level2_hint_channels.mp3",
  "narrator_level2_hint_direction.mp3",
  "narrator_level2_hint_recipe.mp3",
] as const

/** One clip per hands-on quiz question (order matches LEVEL2_QUIZ). */
export const LEVEL2_QUIZ_QUESTION_AUDIO = [
  "narrator_level2_quiz_red.mp3",
  "narrator_level2_quiz_yellow.mp3",
  "narrator_level2_quiz_purple.mp3",
] as const

export function playLevel2Narrator(
  filename: string,
  options?: NarratorPlaybackOptions,
): void {
  playNarratorSrc(`${LEVEL2_AUDIO_BASE}/${filename}`, options)
}

/** Play a Level 2 clip, then run `next` only after it finishes. */
export function playLevel2Then(
  filename: string,
  next: () => void,
  fallbackMs = 20000,
): void {
  let done = false
  const finish = () => {
    if (done) return
    done = true
    next()
  }
  playLevel2Narrator(filename, { onEnd: finish })
  setTimeout(finish, fallbackMs)
}