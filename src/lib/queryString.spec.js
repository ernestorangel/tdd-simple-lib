import { queryString, parse } from './queryString';

describe('Object to query string', () => {
    it('should create a valid query string when an object is provided', () => {
        const obj = {
            name: 'Ernesto',
            profession: 'developer'
        }

        expect(queryString(obj)).toBe('name=Ernesto&profession=developer')
    });

    it('should create a valid string when an array is provided as value to object properties', () => {
        const obj = {
            name: 'Ernesto',
            abilities: ['JS', 'TDD']
        }

        expect(queryString(obj)).toBe('name=Ernesto&abilities=JS,TDD')
    })

    it('should throw an error when an object is provided as value to object properties', () => {
        const obj = {
            name: 'Ernesto',
            abilities: {
                first: 'JS',
                second: 'TDD'
            }
        }

        expect(() => queryString(obj)).toThrowError()
    })
})

describe('Query String to Object', () => {
    it('should convert a query string to an object', () => {
        const qs = 'name=Ernesto&profession=Developer'

        expect(parse(qs)).toEqual({
            name: 'Ernesto',
            profession: 'Developer'
        })
    });

    it('should converty a query string of a single key-value', () => {
        const qs = 'name=Ernesto'

        expect(parse(qs)).toEqual({
            name: 'Ernesto'
        })
    });

    it('should converty a query string of a multiple values', () => {
        const qs = 'name=Ernesto&abilities=TDD,JS'

        expect(parse(qs)).toEqual({
            name: 'Ernesto',
            abilities: ['TDD', 'JS']
        })
    });
})