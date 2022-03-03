package com.example.ejbasmtest.MoneyTransferTest.Mapper;

import com.example.ejbasmtest.MoneyTransferTest.Dto.FundTransferDto;
import com.example.ejbasmtest.MoneyTransferTest.FundTransferEntity;
import org.springframework.beans.BeanUtils;

public class FundTransferMapper extends BaseMapper<FundTransferEntity, FundTransferDto> {
    @Override
    public FundTransferEntity convertToEntity(FundTransferDto dto, Object... args) {
        FundTransferEntity entity = new FundTransferEntity();
        if (dto != null) {
            BeanUtils.copyProperties(dto, entity);
        }
        return entity;
    }

    @Override
    public FundTransferDto convertToDto(FundTransferEntity entity, Object... args) {
        FundTransferDto dto = new FundTransferDto();
        if (entity != null) {
            BeanUtils.copyProperties(entity, dto);
        }
        return dto;
    }
}
