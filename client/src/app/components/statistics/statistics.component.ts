import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  domainStats: Map<string, number> = new Map();
  participationRates: any[] = [];
  structureStats: Map<string, number> = new Map();
  averageParticipationRate: number = 0;
  formationsNearCapacity: any[] = [];
  durationStats: any = {};
  threshold: number = 80;

  // Chart configurations
  public domainChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  public structureChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Participants' }]
  };

  public participationChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ data: [], label: 'Participation Rate (%)' }]
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.loadAllStatistics();
  }

  loadAllStatistics(): void {
    this.loadDomainStats();
    this.loadParticipationRates();
    this.loadStructureStats();
    this.loadAverageParticipationRate();
    this.loadFormationsNearCapacity();
    this.loadDurationStats();
  }

  loadDomainStats(): void {
    this.statisticsService.getStatsByDomain().subscribe(data => {
      this.domainStats = new Map(Object.entries(data));
      this.domainChartData = {
        labels: Array.from(this.domainStats.keys()),
        datasets: [{ data: Array.from(this.domainStats.values()) }]
      };
    });
  }

  loadParticipationRates(): void {
    this.statisticsService.getParticipationRates().subscribe(data => {
      this.participationRates = data;
      this.participationChartData = {
        labels: data.map(item => item.titre),
        datasets: [{ 
          data: data.map(item => item.tauxParticipation),
          label: 'Participation Rate (%)'
        }]
      };
    });
  }

  loadStructureStats(): void {
    this.statisticsService.getStructureDashboard().subscribe(data => {
      this.structureStats = new Map(Object.entries(data));
      this.structureChartData = {
        labels: Array.from(this.structureStats.keys()),
        datasets: [{ 
          data: Array.from(this.structureStats.values()),
          label: 'Participants'
        }]
      };
    });
  }

  loadAverageParticipationRate(): void {
    this.statisticsService.getAverageParticipationRate().subscribe(rate => {
      this.averageParticipationRate = rate;
    });
  }

  loadFormationsNearCapacity(): void {
    this.statisticsService.getFormationsNearCapacity(this.threshold).subscribe(data => {
      this.formationsNearCapacity = data;
    });
  }

  loadDurationStats(): void {
    this.statisticsService.getDurationStatistics().subscribe(stats => {
      this.durationStats = stats;
    });
  }

  updateThreshold(): void {
    this.loadFormationsNearCapacity();
  }
} 