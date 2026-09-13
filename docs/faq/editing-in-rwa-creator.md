# Frequently Asked Questions

## Editing in RWA Creator

### How do moving assets work?

* In the *State view* of RWA Creator, select your asset and toggle the *Moving asset* box. This will make a :rwa-movingAssetStart: icon appear at the center of the given state, which determines the starting position of your moving asset; the asset's own marker becomes the :rwa-movingAssetAnchor: star, the target, and a dotted line joins the two. Once the simulation (:rwa-start:) plays the asset, a :rwa-audiosource: speaker travels along that line, in the *State View* and the *Map View*. The speed at which your moving asset moves from :rwa-movingAssetStart: to :rwa-movingAssetAnchor: is determined in m/s by the value of the *Moving speed* field.

### How do rotating assets work?

* **Binaural-stero** assets: toggling the *Rotating asset* box field in the *State view* will make the two :rwa-audiochannelsource: channels rotate around their :rwa-movingAssetAnchor: icon. The rotation trajectory is determined by defining in Hz the *Rotate Frequency* field, and the Channel radius in meters by the *Channel Radius* field in the *State view*.

* **Binaural-mono** assets: when working with binaural-mono sources, it is necessary to toggle *Enable custom channel-positions*, so that the :rwa-audiochannelsource: becomes visible. Its trajectory is defined by *Rotate Frequency* and *Channel Radius* just as with binaural-stereo assets.
