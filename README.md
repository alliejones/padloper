# Padloper

The [speckled padloper](https://en.wikipedia.org/wiki/Homopus_signatus) is the world's smallest tortoise and this is a tiny turtle graphics language that runs in the browser.

I wrote this as an exercise in learning more about continuations and wrote the interpreter in continuation-passing style. It supports stepped evaluation. The language really is tiny and not very practical, but you can [try out a live demo](http://alliejones.github.io/padloper/).

## References

* [PL101: Continuations](http://nathansuniversity.com/cont.html): the exercise idea, most of the parser grammar and a bunch of bits of code are from here
* [Continuation Passing Style Interpreters](http://blog.theincredibleholk.org/blog/2013/11/27/continuation-passing-style-interpreters/)
* [CPS Evaluator](http://lisperator.net/pltut/cps-evaluator/)
* [By example: Continuation-passing style in JavaScript](http://matt.might.net/articles/by-example-continuation-passing-style/)
* [The potentially asynchronous loop](https://blog.jcoglan.com/2010/08/30/the-potentially-asynchronous-loop/) (helpful in thinking through how to handle looping in the interpreter)
* [Trampolined Style](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.45.5447&rep=rep1&type=pdf) (thanks to [Darius Bacon](https://github.com/darius) for the pointer to this paper)
