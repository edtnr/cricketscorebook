const MatchModel = require("./MatchModel");
const each = require("jest-each").default;
const mongoose = require("mongoose");
const MockDate = require("mockdate");
var match = mongoose.model("match");

describe("MatchModel", () => {
  const date = new Date();
  beforeAll(async () => {
    MockDate.set(date);
    const url = "mongodb://localhost:27017/cricketscorebook";
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterAll(async () => {
    MockDate.reset();
    mongoose.disconnect();
  });

  each`
        case                                                           | homeTeam     | awayTeam     | players     
        ${"away team is undefined"}                                    | ${"England"} | ${undefined} | [${{ name: "Steve", team: "Home", runsscored:0, batting:false, ballsfaced:0, wicketsgained:0, ballsbowled:0, runsagainst:0, out:false, playing:false, facing:false}}}] 
        ${"home team is undefined"}                                    | ${undefined} | ${"England"} | [${{ name: "Steve", team: "Home", runsscored:0, batting:false, ballsfaced:0, wicketsgained:0, ballsbowled:0, runsagainst:0, out:false, playing:false, facing:false}}}]
        ${"players required data are undefined"}                       | ${"England"} | ${"England"} | [${{name: undefined, team: undefined, runsscored:0, batting:false, ballsfaced:0, wicketsgained:0, ballsbowled:0, runsagainst:0, out:false, playing:false, facing:false}}}]
        ${"players do not follow Player Schema"}                       | ${"England"} | ${"England"} | [${{firstName:"TG", playing: "yes"}}]
        ${"When data is entered instead of boolean"}                   | ${"England"} | ${"England"} | [${{ name: "Steve", team: "Home", runsscored:0, batting:"Hello", ballsfaced:0, wicketsgained:0, ballsbowled:0, runsagainst:0, out:false, playing:false, facing:false}}}] 
        ${"When string is entered instead of integer"}                 | ${"England"} | ${"England"} | [${{ name: "Steve", team: "Home", runsscored:"SD", batting:false, ballsfaced:0, wicketsgained:0, ballsbowled:0, runsagainst:0, out:false, playing:false, facing:false}}}] 
        ${"When -1 is entered instead of integer for players field"}   | ${"England"} | ${"England"} | [${{ name: "Steve", team: "Home", runsscored:-1, batting:false, ballsfaced:0, wicketsgained:0, ballsbowled:0, runsagainst:0, out:false, playing:false, facing:false}}}] 
        `.it("Throws an error when $case",
    async ({ homeTeam, awayTeam, players }) =>
      expect(match.create({homeTeam, awayTeam, players})).rejects.toThrow()
  );

  each`
  case                                        | homeTeam     | awayTeam          | players
  ${"only required data is entered"}          | ${"England"} | ${"Australia"}    |  ${[{ name: "Steve", team: "Home"}]}
  ${"all players data is entered"}            | ${"England"} | ${"Australia"}    |  ${[{ name: "Steve", team: "Home", runsscored:0, batting:false, ballsfaced:0, wicketsgained:0, ballsbowled:0, runsagainst:0, out:false, playing:false, facing:false}]}
  `.it("Returns Match object when $case", async ({ homeTeam, awayTeam,players }) => expect(match.create({homeTeam, awayTeam, players})).resolves.toEqual(
         expect.objectContaining({
            _id: expect.any(mongoose.Types.ObjectId),
            homeTeam,
            awayTeam,
            players: expect.arrayContaining([]), // Check that an array is returned
            oversPlayed:0,
            score: 0,
            wickets:0,
        })
    )
  );
});
