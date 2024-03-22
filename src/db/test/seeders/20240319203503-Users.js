module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    id: 100,
                    userNumber: 'USR-AT41YB6R4Z3D',
                    firstName: 'test',
                    lastName: 'test',
                    userName: 'test',
                    password: '$2a$12$2mNnc2ID/aXzvlgozxFHV.u64dGib/Z0sO1TbzUGHKNoj/.SSH4Q.',
                    phoneNumber: '5111111111',
                    isActive: true
                },
                {
                    id: 101,
                    userNumber: 'USR-B4R6TF18YC6A',
                    firstName: 'test1',
                    lastName: 'test1',
                    userName: 'test1',
                    password: '$2a$12$2mNnc2ID/aXzvlgozxFHV.u64dGib/Z0sO1TbzUGHKNoj/.SSH4Q.',
                    phoneNumber: '5111111112',
                    isActive: true
                }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
