import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'
import Song from 'App/Models/Song'
import { DateTime } from 'luxon'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure user created with true values', async (assert) => {
        let now = DateTime.now();  // Проверка на изменение значений при сохранении

        const user = new User();
        user.name = 'Ruslan';
        user.email = 'ruslan@semak.ru';
        user.birth_date = now;
        await user.save()

        assert.equal(user.name, 'Ruslan');
        assert.equal(user.email, 'ruslan@semak.ru');
        assert.equal(user.birth_date, now);
  });


  test('ensure song created with true values', async (assert) => {
        // Проверка на изменение значений при сохранении

        const song = new Song();
        song.title = 'Song1';
        song.singer = 'Singer1';
        song.user_id = 1;
        await song.save();

        assert.equal(song.title, 'Song1');
        assert.equal(song.singer, 'Singer1');
        assert.equal(song.user_id, 1);
    });

    test('/api/song/:id return true song', async (assert) => {
        const { body } = await supertest(BASE_URL).get('/api/song/1').expect(200)  // Хардкод единички, не знаю как по-другому  
        assert.equal(body.id, 1)
    })

    test('/api/user/:id return true song', async (assert) => {
        const { body } = await supertest(BASE_URL).get('/api/user/1').expect(200)  // Хардкод единички, не знаю как по-другому  
        assert.equal(body.id, 1)
    })

    test('/api/song return all songs', async (assert) => {
        const result = await supertest(BASE_URL).get('/api/song').expect(200)
        let lengthBefore = 0;
        for (const _ of result.body) {
            lengthBefore++;
        }

        for (let i =0; i<10; i++){
            const song = new Song();
            song.title = 'Song' + i;
            song.singer = 'Singer' + i;
            song.user_id = 1;
            await song.save();
        }

        const { body } = await supertest(BASE_URL).get('/api/song').expect(200)
        let lengthAfter = 0;
        for (const _ of body) {
            lengthAfter++;
        }

        assert.equal(lengthAfter - lengthBefore, 10)
    })

    test('/api/user return all users', async (assert) => {
        const result = await supertest(BASE_URL).get('/api/user').expect(200)
        let lengthBefore = 0;
        for (const _ of result.body) {
            lengthBefore++;
        }

        for (let i =0; i<10; i++){
            const user = new User();
            user.name = 'Name' + i;
            user.email = 'email' + i;
            user.birth_date = DateTime.now();
            await user.save();
        }

        const { body } = await supertest(BASE_URL).get('/api/user').expect(200)
        let lengthAfter = 0;
        for (const _ of body) {
            lengthAfter++;
        }

        assert.equal(lengthAfter - lengthBefore, 10)
    })

    test('Correct foreignkey for song', async (assert) => {
        const user = new User();
        user.name = 'Ruslan';
        user.email = 'r@s.ru';
        user.birth_date = DateTime.now();
        await user.save()

        const song = new Song();
        song.title = 'Song1';
        song.singer = 'Singer1';
        song.user_id = user.id;
        await song.save();

        const UserResponse = await supertest(BASE_URL).get(`/api/user/${user.id}`).expect(200);
            for (const songIterator of UserResponse.body.songs) {
                if (songIterator.id == song.id){
                    if (songIterator.title == song.title && songIterator.singer == song.singer){
                        return assert.equal(true, true);
                    }
                }
            }
            assert.equal(true, false);
    })

    test('User deleting', async (assert) => {
        const user = new User();
        user.name = 'Ruslan';
        user.email = 'r@s.ru';
        user.birth_date = DateTime.now();
        await user.save()
        const userid = user.id;
        await user.delete();
        assert.equal(user.$isDeleted, true);
        await supertest(BASE_URL).get(`/api/user/${userid}`).expect(404);
    })

    test('Song deleting', async (assert) => {
        const song = new Song();
        song.title = 'Title1';
        song.singer = 'Singer1';
        await song.save()
        const songid = song.id;
        await song.delete();
        assert.equal(song.$isDeleted, true);
        await supertest(BASE_URL).get(`/api/song/${songid}`).expect(404);
    })

    test('Song cascade deleting', async (_assert) => {
        const user = new User();
        user.name = 'Ruslan';
        user.email = 'r@s.ru';
        user.birth_date = DateTime.now();
        await user.save()

        const song = new Song();
        song.title = 'Title1';
        song.singer = 'Singer1';
        song.user_id = user.id;
        await song.save()
        const songid = song.id;
        await user.delete();

        const res = await supertest(BASE_URL).get(`/api/song/${songid}`).expect(404);
        //assert.equal(song.$isDeleted, true);    Выдаёт false при каскадном удалении.
    })
})
