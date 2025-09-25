const bowlers = [
    { id: 'u1', name: 'Antonio Lee', hand: 'L', speedMph: 13, line: 'Center to 10-right', avg: 176 },
    { id: 'u2', name: 'Tony Lee', hand: 'R', speedMph: 11, line: 'Center to 7-left', avg: 187 },
    { id: 'u2', name: 'Fred Reid', hand: 'R', speedMph: 14, line: 'Center to 7-left', avg: 203 },
    { id: 'u2', name: 'Isaac Bates', hand: 'R', speedMph: 15, line: 'Center to 2-left', avg: 107 },
]

const leagues = [
    {
        id: 'l1', name: 'Tuesday Night Mixers', center: 'River City Lanes', season: '2025 Fall', weeks: 12,
        teams: [
            { id: 't1', name: 'Pin Pals', bowlers: ['u1', 'u2'] },
            { id: 't2', name: 'Split Happens', bowlers: ['u3', 'u4'] },
        ]
    }
]

const games = [
    { id: 'g1', bowlerId: 'u1', leagueId: 'l1', seriesDate: '2025-09-18', gameNo: 1, score: 178, notes: 'Missed 10-pin' },
    { id: 'g2', bowlerId: 'u1', leagueId: 'l1', seriesDate: '2025-09-18', gameNo: 2, score: 201, notes: 'Great carry' },
    { id: 'g3', bowlerId: 'u1', leagueId: 'l1', seriesDate: '2025-09-18', gameNo: 3, score: 189, notes: '' },
]


export default { bowlers, leagues, games }