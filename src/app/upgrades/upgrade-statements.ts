export const mapModeLocationVersionUpgrades = [
  {
    toVersion: 1,
    statements: [
          `
        CREATE TABLE mapGroup (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          name VARCHAR NOT NULL
        );
          `,
    ]
  },
]
