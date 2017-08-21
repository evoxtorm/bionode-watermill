'use strict'

const { task, fork, join, junction } = require('../')

const { assert } = require('chai')
const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('./graphson.json', 'utf8'));

// Define tasks

const task0 = task({name: 'task0_2"'}, () => `echo "something0_2"`)

const task1 = task({name: 'task1_2'}, () => `echo "something1_2"`)

const task2 = task({name: 'task2_2'}, () => `echo "something2_2"`)

const task3 = task({name: 'task3_2'}, () => `echo "something3_2"`)

const task4 = task({name: 'task4_2'}, () => `echo "something4_2"`)

const task5 = task({name: 'task5_2'}, () => `echo "something5_2"`)

const task6 = task({name: 'task6_2'}, () => `echo "something6_2"`)

describe('fork_fork', () => {
  it('fork should work after a fork, wrapped in a join', (done) => {
    const pipeline = join(
      task0,
      fork(
        join(
          task1,
          fork(
            task4,
            task5
          ),
          task6
        ),
        task2
      ),
      task3
    )
    pipeline().then((results) => {
      console.log('RESULTS: ',results)

      // should assure that both ends of the pipeline exist
      assert.equal(results[1].tasks[1], results[1].context.trajectory[2])
      //checks if pipeline rendered the right number of vertices and edges
      assert.equal(obj.graph.vertices.length, 10)
      assert.equal(obj.graph.edges.length, 9)
      //done() // without done it is not really testing anything
    })
  }).timeout(5000)
})
