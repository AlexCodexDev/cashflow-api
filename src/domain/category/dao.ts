import prisma from "../../config/prisma.js";

export const CreateCategoryDAO = async (data: any) => {
    const { name, icon, description, color } = data;

    try {
        // Get month year
        const now = new Date();
        const yearMonth = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
        const prefix = `CTY-${yearMonth}-`;

        // Get latest category
        const latestCat = await prisma.category.findFirst({
            where: {
                code: {
                    startsWith: prefix
                },
            },
            orderBy: {
                code: 'desc'
            }
        });

        let sequence = 1;
        if(latestCat) {
            sequence = Number(latestCat.code.split("-")[2]) + 1;
        }

        const code = `${prefix}${String(sequence).padStart(3, "0")}`;
        console.log(code);

        // const category = await prisma.category.create({
        //     data: {
        //         code: code,
        //         name: name,
        //         description: description,
        //         icon: icon,
        //         color: color,
        //         is_active: true
        //     }
        // })
        // return category;
    } catch (error: any) {
        console.log(error);
        throw new Error("Something went wrong : " + error.message);
    }
}