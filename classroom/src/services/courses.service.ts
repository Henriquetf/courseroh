import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { generateSlug } from 'src/utils/slug';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = generateSlug(title);

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseWithSameSlug) {
      throw new Error('Another course with same slug already exists.');
    }

    const course = await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });

    return course;
  }
}
