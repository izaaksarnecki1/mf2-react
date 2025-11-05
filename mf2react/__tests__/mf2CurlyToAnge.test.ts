import { mf2CurlyToAngle } from '../src/plugin';

describe('mf2CurlyToAngle', () => {
    test('converts bold tag', () => {
        const input = '{#bold}Hi{/bold}';
        const expected = '<strong>Hi</strong>';
        expect(mf2CurlyToAngle(input)).toBe(expected);
    });
});