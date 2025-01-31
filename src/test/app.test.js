import request from 'supertest'; 
import { expect } from 'chai';
import app from '../index.js' 



describe('backend funcionanado',() =>{
    describe('Servidor esta arriba',() =>{
        it('Debería iniciar el servidor sin problemas',(done)=>{
            request(app)
            .get('/')
            .expect(404)
            .end((err,res) =>{
                if(err) return done(err);
                expect(res.status).to.equal(404);
                done();
            })
        })
    })
})

describe('backend funcionando', () => {
    describe('Servidor y base de datos', () => {
        it('Debería iniciar el servidor y conectar a la base de datos', (done) => {
            request(app)
                .get('/check-db') 
                .expect(200) 
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});



describe('CRUD de User', () => {
    it('Debería crear un usuario exitosamente', async() => {
        const user = {
            firstName: "Margarita",
            lastName: "Isamit", 
            email: "margarita@correo.com",
        };

        const res = await request(app).post("/api/v1/user").send(user);
        expect(res.status).to.equal(201); 
        expect(res.body.data).to.include(user);
        expect(res.body.message).to.equal("Usuario creado con éxito");
    });

    it('Debería devolver todos los usuarios activos', async() => {
        const res = await request(app).get("/api/v1/user");
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.message).to.equal("Usuarios encontrados con éxito");
    });

    it('Debería actualizar correctamente un usuario ya existente por ID', async() => {
        const id = "b43edebd-7556-4cd2-9c34-e31729513b54";

        const user = {
            firstName: "Antonieta",
            lastName: "Mayo", 
            email: "mantinita@correo.com"
        };

        const res = await request(app).put(`/api/v1/user/${id}`).send(user);
        
        
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Usuario actualizado con éxito");
        expect(res.body.newData).to.include(user); 

        
    });
});
        
    

describe('CRUD de Bootcamp', () => {
    it('Debería crear Bootcamp exitosamente', async() => {
        const bootcamp = {
            title: "Introduccion Typescript",
            cue: 6, 
            description: "TypeScript es un lenguaje de programación de código abierto y de alto nivel que se basa en JavaScript",
        };

        const res = await request(app).post("/api/v1/bootcamp").send(bootcamp);
        expect(res.status).to.equal(201); 
        expect(res.body.data).to.include(bootcamp);
        expect(res.body.message).to.equal("Bootcamp creado con éxito");
    });

    it('Debería devolver todos los Bootcamps', async() => {
        const res = await request(app).get("/api/v1/bootcamp");
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.message).to.equal("Todos los Bootcamps encontrados con éxito");
    });

});












