-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "homeTeamCountryCode" TEXT NOT NULL,
    "homeTeamScore" INTEGER,
    "awayTeamCountryCode" TEXT NOT NULL,
    "awayTeamScore" INTEGER
);
INSERT INTO "new_Match" ("awayTeamCountryCode", "awayTeamScore", "date", "homeTeamCountryCode", "homeTeamScore", "id") SELECT "awayTeamCountryCode", "awayTeamScore", "date", "homeTeamCountryCode", "homeTeamScore", "id" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
