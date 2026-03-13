# General Game Structure

- A *game* consists at least of one *scene*, a *scene* is usually located at a certain GPS position.
- A *scene* consists at least of two *states*: a *background* and a *fallback state*. The *background state* is always active for the whole *scene*. The *fallback state* is entered if no other (except the *background state*) is active. A new *state* can either be created by double clicking into the *map view*, or by select *new state* from the state menu.
- A state should hold at least one *asset*. Otherwise it has no purpose. An asset can either be an *audio file* or a *Pure Data patcher*.
- All views render by default the last touched *scene*, *state* and *asset*. Therefore, if a state is touched within the *map view*, the *state view* automatically renders the same *state*.
