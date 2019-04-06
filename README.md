# Draft Lottery Generator
This project is to generate a fantasy sport draft order, based on a lottery system.

## How it works
A lottery pot is created with 8 teams in the lottery. Teams are given the number of tickets that correspond to their number (e.g. Team 6 gets 6 tickets)

Each round, a number (1-8) is picked out of the pot. That pick is the team drafting in that position. After a number is pulled, the remaining instances of that number are also removed from the pot.


- 1st - 8 tickets - 22.22% chance at first pick
- 2nd - 7 tickets - 19.44% chance at first pick
- 3rd - 6 tickets - 16.67% chance at first pick
- 4th - 5 tickets - 13.89% chance at first pick
- 5th - 4 tickets - 11.11% chance at first pick
- 6th - 3 tickets - 8.33% chance at first pick
- 7th - 2 tickets - 5.56% chance at first pick
- 8th - 1 ticket - 2.78% chance at first pick

Total Tickets: 36


## Example

pot: [8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 2, 2, 1]

Randomly generated pick is 7

new pot: [8, 8, 8, 8, 8, 8, 8, 8, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 2, 2, 1]

and so on... until there are no numbers left