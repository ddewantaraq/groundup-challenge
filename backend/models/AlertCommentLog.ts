import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Alert } from './Alert';

@Table({ tableName: 'alert_comment_logs', timestamps: false })
export class AlertCommentLog extends Model<AlertCommentLog> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => Alert)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare alert_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare suspected_reason?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare action?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare comment?: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare updated_at?: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  declare updated_by?: string;

  @BelongsTo(() => Alert)
  declare alert: Alert;
} 