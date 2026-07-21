# Frequently Asked Questions

## 1. Editing in RWA Creator

## How do moving assets work?

* In the *State view* of RWA Creator, select your asset and toggle the *Moving asset* box. This will make a :rwa-audiosourcestartpoint1: icon appear at the center of the given state, which determines the starting position of your moving asset, and it will move along a straight path until it reaches the :rwa-audiosource: icon. Upon starting simulation (:rwa-start:), your moving asset will appear as a :rwa-audiosourcestartpoint: icon in the *Map view*. The speed at which your moving asset moves from :rwa-audiosourcestartpoint1: to :rwa-audiosource: is determined in m/s by the value of the *Moving speed* field.

## How do rotating assets work?

* **Binaural-stero** assets: toggling the *Rotating asset* box field in the *State view* will make the two :rwa-audiochannelsource: channels rotate around their :rwa-audiosource: icon. The rotation trajectory is determined by defining in Hz the *Rotate Frequency* field, and the Channel radius in meters by the *Channel Radius* field in the *State view*.

* **Binaural-mono** assets: when working with binaural-mono sources, it is necessary to toggle *Enable custom channel-positions*, so that the :rwa-audiochannelsource: becomes visible. Its trajectory is defined by *Rotate Frequency* and *Channel Radius* just as with binaural-stereo assets.
