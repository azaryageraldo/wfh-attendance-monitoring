import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @Roles(Role.ADMIN_HR)
  async getStats() {
    return this.dashboardService.getDashboardStats();
  }

  @Get('karyawan')
  async getKaryawanDashboard(@Request() req: any) {
    const userId = req.user.id;
    return this.dashboardService.getKaryawanDashboard(userId);
  }
}
