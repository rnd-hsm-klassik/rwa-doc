# General Game Structure

RWA Creator is a software where you can create GPS-based soundwalks, also referred to as *games*. The logic of the program allows you to define your own game by organizing and structuring space through three different layers of abstraction: *game*, *scene* and *state*.

## Layers

1. A **game** consists at least of one **scene**, which is located at a certain GPS position, and its area is delimited by the attribute *Area Type*.
2. A **scene** consists at least of two **states**: a *background* and a *fallback state*. The *background state* is always active for the whole *scene*. The *fallback state* is entered if no other (except the *background state*) is active. A new *state* can either be created by double clicking into the *map view*, or by select *new state* from the state menu.
3. A **state** should hold at least one **asset**. Otherwise it has no purpose. An asset can either be an *audio file* or a *Pure Data patcher*.

- All views render by default the last touched *scene*, *state* and *asset*. Therefore, if a state is touched within the *map view*, the *state view* automatically renders the same *state*.

## Moving Between Layers

To reframe: you can think of the layers as a hierarchy: a *game* is the top layer that contains one or more *scenes*, each *scene* is like a room that contains one or more *states*, and each *state* is like its own event happening inside a room, which can be composed of one or more *assets*.

Being aware of the nested logic described above helps you understand how *background* and *fallback* states can be used as "room noise" in a given *scene*, whereas regular GPS states are elements happening on top.

One of the beautiful creative aspects of the RWA environment is--as it is explain in detail in each of the *views* sections--the **sonic** and **spatial** complexity that is possible by playing with how elements from the same or different layers can transition between one another.
