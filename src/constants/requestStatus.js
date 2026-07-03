const STATUS = Object.freeze({
  NEW: "New",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
});

const STATUS_VALUES = Object.values(STATUS);

const ALLOWED_TRANSITIONS = Object.freeze({
  [STATUS.NEW]: [STATUS.IN_PROGRESS],
  [STATUS.IN_PROGRESS]: [STATUS.DONE],
  [STATUS.DONE]: [], // terminal state
});

function isValidTransition(from, to) {
  return Boolean(ALLOWED_TRANSITIONS[from]?.includes(to));
}

module.exports = {
  STATUS,
  STATUS_VALUES,
  ALLOWED_TRANSITIONS,
  isValidTransition,
};
