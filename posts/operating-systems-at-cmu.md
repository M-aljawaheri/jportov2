---
title: 'BabaOS: Making an x86 Operating system @ CMU'
date: '2023-01-30'
include_in_works: true
works_title: 'BabaOS'
---


Many people doubt the value of an undergraduate degree in computer science.
&nbsp;  
**15-410: Operating Systems Design & Implementation** @ CMU was one of the few classes that made the CMU degree worth getting for me.
&nbsp;  
&nbsp;


While most undergraduate classes on operating systems are covering process management, shells and virtual memory, we cover these topics in the first or second year in Intro to Computer Systems. The operating systems class is infamous, and for a good reason: You get to implement your own kernel starting from little to no abstraction.
&nbsp;  
&nbsp;

Project 0 and 1 have you writing little tools and drivers that ultimately serve one purpose: to let you know that you have not learned to code yet. 
&nbsp;  
&nbsp;

You will quickly discover that the code you write is reviewed and graded **by hand** by the course staff, and boy do they pay attention. You are judged on design all the way from solution design, to module design and module communication & lib-ification of libb-able code. Zooming in on each module, what files comprise the module, is it a clean split? are there too many "stuff.c" kind of files that just do things? zooming in one step further on each file, does the file serve a clear purpose within its module, cleanly split into functions? is each function clear and concise and serves a single purpose? any "hidden" contracts or policies? zooming in on each function, the typical "peephole" code quality issues, naming, flow, optimizations, and of course, error handling. oh boy do you learn that errors matter. Because a single unchecked error code is a sin that you will have to explain to the instructor and ask for forgiveness for
&nbsp;  
&nbsp;

By the end of those two projects you will have hopefully learned to write slightly more robust code from your mistakes (of which you will make plenty). Project 2 has you writing a User-space threading library, and this is where the concurrency game starts. Your task is simple. Create a threading library and a mutex, condition variable and rwlocks.
&nbsp;  
&nbsp;

Except.. what is a mutex? :)&nbsp;  

That is the level of questions the class has you answering. you are not implementing mutual exclusion you learned from the classroom like the bakery algorithm. You are simply told: Hey, there is your x86 instruction manual, here is how the processor works, come up with a way to achieve mutual exclusion providing a lock and an unlock mechanism. Class covers a simple method of doing mutual exclusion that does not work because it does not achieve all three **key** properties of mutexes. And this is a recurring theme in the class, we do not just build things that seem to work, they have to be well-made. A mutex that simply achieves mutual exclusion is not a satisfactory solution. In this case we wanted a mutex ensured: A) Mutual Exclusion B) Progress C) Bounded waiting. Mutual exclusion is self explanatory, Progress means that the system will not get stuck, if the lock is available, __some__ thread will get it if there was competition. Bounded waiting is the trickiest, essentially, no thread will have to wait __forever__ no matter how unlucky. Imagine a spinning lock where threads randomly back off waiting to take it again, and whoever happens to wake up when it's free and takes it gets to run away with it. A really unlucky thread could sleep and lose the race each time it wakes up. There is no way to guarantee that every thread it will get it in N operations or steps (or rounds, or whatever metric of progress you're using).
&nbsp;  
&nbsp;

After learning about concurrency and the grueling race conditions that come along, you implement the kernel with your partner. Abiding to a course-custom kernel specification called Pebbles, required to support a set of system calls. with the "big 4" being fork, exec, wait and vanish (thread death). This will also have you writing drivers and handlers for every possible machine interrupt, and you start with nothing but a piece of assembly code that uses grub to bootload you into a C ```kernel_main()``` function in [real mode](https://en.wikipedia.org/wiki/Real_mode), from there you have to do __every__ single thing, from entering [protected mode](https://en.wikipedia.org/wiki/Protected_mode) to turn on virtual memory, setting up the page tables. This is when you learn the power of abstractions. From the moment you start writing your kernel you start writing in a desolate land that is so hard to invest in. As you progress you will find yourself building layers and layers of abstraction, not because you've been told it's cool, but because you cannot reinvent virtual memory addressing every time you want to access memory. You start creating abstractions within your kernel, standard ways of accessing data. queues, locks and so on. You build into that desolate land structures upon structures to the point where by the last system call you add into the system, it's a matter of turning a few knobs in your kernel, adding an entry somewhere, and writing a few lines of code.
&nbsp;  
&nbsp;

And the best part? we get to test our kernel by burning it onto a CD-ROM and booting it up on a "crash machine" provided by the course staff



&nbsp;  
&nbsp;
Shoutouts to my partner, currently doing his masters @CMU, [Faisal Abdelmonem](https://www.linkedin.com/in/faisal-saleh-b2939418b/)



