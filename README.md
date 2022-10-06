
# velpa

![Video app](https://github.com/quantopian/pyfolio/raw/master/docs/simple_tear_0.png "Example tear sheet created from a Zipline algo")


Velpa is a mobile aplication for connecting people who wants to go into an adventure and local guides who know the route.

When a user join the app, it is mandatory to sign in for continuing:

![Video app](https://github.com/quantopian/pyfolio/raw/master/docs/simple_tear_0.png "Example tear sheet created from a Zipline algo")


Also see [slides of a talk about
pyfolio](https://nbviewer.jupyter.org/format/slides/github/quantopian/pyfolio/blob/master/pyfolio/examples/pyfolio_talk_slides.ipynb#/).

## Installation

To install pyfolio, run:

```bash
pip install pyfolio
```

#### Development

For development, you may want to use a [virtual environment](https://docs.python-guide.org/en/latest/dev/virtualenvs/) to avoid dependency conflicts between pyfolio and other Python projects you have. To get set up with a virtual env, run:
```bash
mkvirtualenv pyfolio
```

Next, clone this git repository and run `python setup.py develop`
and edit the library files directly.

#### Matplotlib on OSX

If you are on OSX and using a non-framework build of Python, you may need to set your backend:
``` bash
echo "backend: TkAgg" > ~/.matplotlib/matplotlibrc
```

## Usage

A good way to get started is to run the pyfolio examples in
a [Jupyter notebook](https://jupyter.org/). To do this, you first want to
start a Jupyter notebook server:

```bash
jupyter notebook
```

From the notebook list page, navigate to the pyfolio examples directory
and open a notebook. Execute the code in a notebook cell by clicking on it
and hitting Shift+Enter.


## Questions?

If you find a bug, feel free to [open an issue](https://github.com/quantopian/pyfolio/issues) in this repository.

You can also join our [mailing list](https://groups.google.com/forum/#!forum/pyfolio) or
our [Gitter channel](https://gitter.im/quantopian/pyfolio).

## Support

Please [open an issue](https://github.com/quantopian/pyfolio/issues/new) for support.

## Contributing

If you'd like to contribute, a great place to look is the [issues marked with help-wanted](https://github.com/quantopian/pyfolio/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

For a list of core developers and outside collaborators, see [the GitHub contributors list](https://github.com/quantopian/pyfolio/graphs/contributors).
