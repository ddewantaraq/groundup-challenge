import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Machine } from './Machine';
import { AlertCommentLog } from './AlertCommentLog';

export type AlertType = 'Mild' | 'Moderate' | 'Severe';

@Table({ tableName: 'alerts', timestamps: false })
export class Alert extends Model<Alert> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare timestamp: number;

  @ForeignKey(() => Machine)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare machine_id: number;

  @Column({ type: DataType.ENUM('Mild', 'Moderate', 'Severe'), allowNull: false })
  declare alert_type: AlertType;

  @Column({ type: DataType.STRING, allowNull: false })
  declare sensor: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare sound_clip: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare suspected_reason?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare action?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare comment?: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare created_at?: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare updated_at?: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  declare created_by?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare updated_by?: string;

  @BelongsTo(() => Machine)
  declare machine: Machine;

  @HasMany(() => AlertCommentLog)
  declare comment_logs: AlertCommentLog[];
} 